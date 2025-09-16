// Script pour générer des démonstrations de mouvements des pièces
// Utilise Canvas HTML5 pour créer des images de démonstration

class MovementDemo {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.pieces = [];
  }

  // Initialiser le canvas de démonstration
  initDemoCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
    
    // Ajouter le canvas à la page
    const container = document.getElementById('demo-container');
    if (container) {
      container.appendChild(this.canvas);
      container.style.display = 'block';
    }
    
    return this.canvas;
  }

  // Créer le damier de base
  createChessboard() {
    const boardSize = 9;
    const tileSize = this.canvas.width / boardSize;
    
    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        const color = (x + y) % 2 === 0 ? '#f0d9b5' : '#b58863';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        
        // Bordure
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  // Calculer les mouvements possibles d'une pièce
  calculateMovements(piece, centerX, centerY) {
    const positions = [];
    const boardSize = 9;
    
    piece.moves.forEach(move => {
      for (let distance = 1; distance <= piece.range; distance++) {
        const newX = centerX + move[0] * distance;
        const newY = centerY + move[1] * distance;
        
        // Vérifier que la position est dans le plateau
        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
          positions.push({ x: newX, y: newY });
        }
      }
    });
    
    return positions;
  }

  // Créer une démonstration pour une pièce
  createPieceDemo(piece) {
    const boardSize = 9;
    const tileSize = this.canvas.width / boardSize;
    const centerX = 4;
    const centerY = 4;
    
    // Dessiner le damier
    this.createChessboard();
    
    // Calculer les mouvements possibles
    const reachablePositions = this.calculateMovements(piece, centerX, centerY);
    
    // Dessiner les cases de mouvement
    reachablePositions.forEach(pos => {
      this.ctx.fillStyle = 'rgba(0, 255, 0, 0.6)';
      this.ctx.fillRect(
        pos.x * tileSize + 2,
        pos.y * tileSize + 2,
        tileSize - 4,
        tileSize - 4
      );
    });
    
    // Dessiner la pièce au centre
    this.ctx.fillStyle = '#ff0000';
    this.ctx.beginPath();
    this.ctx.arc(
      centerX * tileSize + tileSize/2,
      centerY * tileSize + tileSize/2,
      tileSize/3,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    
    // Ajouter le nom de la pièce
    this.ctx.fillStyle = '#000000';
    this.ctx.font = 'bold 16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      piece.name,
      this.canvas.width/2,
      this.canvas.height - 20
    );
    
    // Ajouter les informations de mouvement
    this.ctx.font = '12px Arial';
    this.ctx.fillText(
      `Range: ${piece.range} | Moves: ${piece.moves.length}`,
      this.canvas.width/2,
      this.canvas.height - 5
    );
  }

  // Exporter une image de démonstration
  exportDemoImage(piece) {
    this.createPieceDemo(piece);
    
    // Créer un lien de téléchargement
    const link = document.createElement('a');
    link.download = `${piece.name}_movement_demo.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }

  // Générer toutes les démonstrations
  generateAllDemos() {
    const pieces = [
      { name: 'Mario', moves: [[1,1],[1,-1],[-1,1],[-1,-1]], range: 2 },
      { name: 'Link', moves: [[1,0],[-1,0],[0,1],[0,-1]], range: 3 },
      { name: 'Zelda', moves: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], range: 8 },
      { name: 'Bowser', moves: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], range: 3 },
      { name: 'Ganondorf', moves: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], range: 4 },
      { name: 'Samus', moves: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], range: 4 },
      { name: 'Pit', moves: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], range: 3 },
      { name: 'Palutena', moves: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], range: 6 },
      { name: 'Sheik', moves: [[1,1],[1,-1],[-1,1],[-1,-1],[2,0],[-2,0],[0,2],[0,-2]], range: 2 },
      { name: 'Wario', moves: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], range: 2 },
      { name: 'Duck Hunt', moves: [[1,0],[-1,0],[0,1],[0,-1]], range: 5 },
      { name: 'Wii Fit Trainer', moves: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], range: 2 }
    ];
    
    this.pieces = pieces;
    return pieces;
  }

  // Exporter toutes les images
  exportAllImages() {
    if (this.pieces.length === 0) {
      this.generateAllDemos();
    }
    
    this.pieces.forEach((piece, index) => {
      setTimeout(() => {
        this.exportDemoImage(piece);
      }, index * 500); // Délai entre chaque export
    });
  }
}

// Fonction globale pour lancer les démonstrations
window.generateMovementDemos = function() {
  const demo = new MovementDemo();
  demo.initDemoCanvas();
  const pieces = demo.generateAllDemos();
  window.movementDemo = demo;
  
  // Afficher la première démonstration
  if (pieces.length > 0) {
    demo.createPieceDemo(pieces[0]);
  }
  
  return demo;
};

// Fonction pour exporter toutes les démonstrations
window.exportAllMovementDemos = function() {
  if (window.movementDemo) {
    window.movementDemo.exportAllImages();
  } else {
    alert('Veuillez d\'abord générer les démonstrations !');
  }
};