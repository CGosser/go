// Algorithm for scoring a completed Go game.
//
// Input: (1) A GAMESTATE G in which both white and black have passed consecutively, and mutually agreed to remove any dead stones from the board (2) Two numbers, WHITECAPTURES and BLACKCAPTURES, indicating the number of stones each player captured during the course of the game.
//   - A separate function will need to be written in which, after passing, players select the dead stones. These stones will be set to Null in the GAMESTATE, and the GAMESTATE is passed to this algorithm.
//
// Output: A COLOR (white or black), indicating the game's winner, and a number MARGIN, the amount by which COLOR outscored his/her opponent.
//
// Method:
//   let WHITESCORE = WHITECAPTURES, BLACKSCORE = BLACKCAPTURES
//   for 0 <= i,j < dim G
//     if G(i,j) = null => add G(i,j) to Territories // Build the list of points to search
//
//   while Territories is non-empty
//     let p = Territories.shift()
//     // BFS, similar to Game.prototype.buildGroup; build a maximal group of adjacent empty points
//       let queue = [p]
//       let group = [p]
//       let border: boolean[] = [false, false]
//       while queue is non-empty
//         let next = queue.shift()
//         let neighbors = checkAdjacencies(next)
//         neighbors.forEach(neighbor)
//           if G(neighbor) is null => add neighbor to group, queue; remove neighbor from Territories
//         remove p from queue
//       group.forEach(point)
//         let neighbors = checkAdjacencies(point)
//         neighbors.forEach(neighbor)
//           if G(neighbor) = "white" => border[0] = true
//           else if G(neighbor) = "black" => border[1] = true
//       if (border[0] && !border[1]) => add group.length to WHITESCORE
//       else if (!border[0] && border[1]) => add group.length to BLACKSCORE
//
//   if WHITESCORE > BLACKSCORE => return {COLOR: "white", MARGIN: WHITESCORE - BLACKSCORE}
//   else if BLACKSCORE > WHITESCORE => return {COLOR: "black", MARGIN: BLACKSCORE - WHITESCORE}
//
// NOTE: whatever other issues this may have, it leaves open the possibility of a drawn game, because we have yet to introduce komi (handicap) to the scoring. We may want to put that in the Game class, adjustable by the players at game start, or just adjust at this point by  afixed value of +6.5 for white.
