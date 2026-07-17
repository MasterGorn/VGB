<?php
require_once __DIR__ . '/bootstrap.php';

$limit = max(1, min(100, (int)($_GET['limit'] ?? 20)));
$pdo = vgb_db();
$stmt = $pdo->query(
  'SELECT id, username, elo, wins, losses, draws FROM users ORDER BY elo DESC, wins DESC, username ASC LIMIT ' . $limit
);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$leaderboard = array_map(function ($u, $i) {
  return [
    'rank' => $i + 1,
    'id' => (int)$u['id'],
    'username' => $u['username'],
    'elo' => (int)$u['elo'],
    'wins' => (int)$u['wins'],
    'losses' => (int)$u['losses'],
    'draws' => (int)$u['draws'],
  ];
}, $rows, array_keys($rows));

vgb_ok(['leaderboard' => $leaderboard]);
