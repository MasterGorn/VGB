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
    // Utiliser la liste complète des pièces depuis pieces.js
    if (typeof piecesData !== 'undefined') {
      this.pieces = piecesData;
      console.log(`Chargement de ${piecesData.length} pièces depuis piecesData`);
      console.log('Factions disponibles:', [...new Set(piecesData.map(p => p.faction))]);
      return piecesData;
    } else {
      // Fallback si piecesData n'est pas disponible
      console.warn('piecesData non disponible, utilisation de la liste de fallback');
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
  }

  // Exporter toutes les images dans une archive ZIP
  async exportAllImages() {
    // S'assurer qu'on a toutes les pièces
    if (typeof piecesData !== 'undefined') {
      this.pieces = piecesData;
    } else if (this.pieces.length === 0) {
      this.generateAllDemos();
    }
    
    console.log(`Génération de ${this.pieces.length} images...`);
    console.log('Pièces à traiter:', this.pieces.map(p => p.name));
    
    // Vérifier que JSZip est disponible
    if (typeof JSZip === 'undefined') {
      throw new Error('JSZip n\'est pas disponible');
    }
    
    // Créer une archive ZIP
    const zip = new JSZip();
    
    // Éléments de progression
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    try {
      // Traiter toutes les pièces de manière séquentielle pour éviter les conflits de canvas
      for (let i = 0; i < this.pieces.length; i++) {
        const piece = this.pieces[i];
        const progress = ((i + 1) / this.pieces.length) * 100;
        
        console.log(`Génération de l'image pour ${piece.name}... (${i + 1}/${this.pieces.length})`);
        
        // Mettre à jour la progression
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
        }
        if (progressText) {
          progressText.textContent = `Génération de ${piece.name}... (${i + 1}/${this.pieces.length})`;
        }
        
        // Créer l'image pour cette pièce
        this.createPieceDemo(piece);
        
        // Attendre que le canvas soit prêt
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Convertir le canvas en blob de manière synchrone
        const canvas = this.canvas;
        if (!canvas) {
          throw new Error('Canvas non disponible');
        }
        
        const dataURL = canvas.toDataURL('image/png');
        if (!dataURL || dataURL === 'data:,') {
          throw new Error(`Erreur lors de la génération de l'image pour ${piece.name}`);
        }
        
        const base64 = dataURL.split(',')[1];
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        
        for (let j = 0; j < binaryString.length; j++) {
          bytes[j] = binaryString.charCodeAt(j);
        }
        
        // Ajouter l'image à l'archive
        zip.file(`${piece.name}_movement_demo.png`, bytes);
        console.log(`Image ${piece.name} ajoutée à l'archive (${bytes.length} bytes)`);
      }
      
      // Mettre à jour la progression pour la génération de l'archive
      if (progressText) {
        progressText.textContent = 'Génération de l\'archive ZIP...';
      }
      
      console.log('Génération de l\'archive ZIP...');
      console.log('Nombre de fichiers dans l\'archive:', Object.keys(zip.files).length);
      
      // Générer l'archive
      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6
        }
      });
      
      console.log('Archive générée, taille:', content.size, 'bytes');
      
      if (content.size === 0) {
        throw new Error('L\'archive générée est vide');
      }
      
      // Créer le lien de téléchargement
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'movement_demos_all_pieces.zip';
      link.style.display = 'none';
      
      // Ajouter au DOM et cliquer
      document.body.appendChild(link);
      
      // Méthode 1: Clic simple
      try {
        link.click();
        console.log('Téléchargement par clic simple');
      } catch (e) {
        console.log('Clic simple échoué, tentative avec MouseEvent');
        
        // Méthode 2: MouseEvent
        try {
          const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          link.dispatchEvent(event);
          console.log('Téléchargement par MouseEvent');
        } catch (e2) {
          console.log('MouseEvent échoué, tentative avec window.open');
          
          // Méthode 3: window.open
          try {
            const newWindow = window.open(link.href, '_blank');
            if (newWindow) {
              newWindow.close();
              console.log('Téléchargement par window.open');
            } else {
              throw new Error('window.open bloqué');
            }
          } catch (e3) {
            console.error('Toutes les méthodes de téléchargement ont échoué');
            throw new Error('Impossible de télécharger le fichier. Vérifiez les paramètres de votre navigateur.');
          }
        }
      }
      
      console.log('Lien de téléchargement créé et cliqué');
      
      // Nettoyer après un délai
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(link.href);
        console.log('Nettoyage effectué');
      }, 2000);
      
      console.log('Archive ZIP téléchargée avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de la génération de l\'archive:', error);
      if (progressText) {
        progressText.textContent = 'Erreur lors de la génération: ' + error.message;
      }
      throw error; // Re-throw pour que le gestionnaire d'erreur du bouton puisse le capturer
    }
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