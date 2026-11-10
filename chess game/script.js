// all variables declarations 
const board = document.getElementById("board");
let myPawnStartPosition = 48;
let myPawnEndPosition = 55;
let opponentPawnStartPosition = 8;
let opponentPawnEndPosition = 15;
let turn = "Ops";
let FinshiedPawns = document.querySelector("#FinshiedPawns");
let OpsFinishedPawns = document.querySelector("#OpsFinishedPawns");
// these remember if king or rook has moved once (castling is not allowed after that)
let myKingMoved = false;
let myLeftRookMoved = false;
let myRightRookMoved = false;
let opKingMoved = false;
let opLeftRookMoved = false;
let opRightRookMoved = false;
/**********making rows in a board chess board*******/
function makeRows(size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const square = document.createElement("div");
            square.className = "gridElement";
            if ((i + j) % 2 == 0) {
                square.classList.add("whiteColor")
            } else {
                square.classList.add("redColor")
            }

            board.append(square);
        }
    }
    const gridElement = document.querySelectorAll(".gridElement");
    gridElement.forEach((item, index) => {
        item.id = index;
    })
}

function adjustingSoldiers() {
    const gridItems = board.querySelectorAll(".gridElement");
    console.log(gridItems);

    gridItems.forEach((item, index) => {
        if (index >= myPawnStartPosition && index <= myPawnEndPosition) {
            let pawn = document.createElement("div");
            pawn.id = index;
            pawn.className = "pawn";
            let pawnImage = document.createElement("img");
            pawn.setAttribute("firstMove", "true");
            pawnImage.src = "pawn.png";
            pawn.appendChild(pawnImage);
            item.appendChild(pawn);
        } else if (index >= opponentPawnStartPosition && index <= opponentPawnEndPosition) {
            let pawn = document.createElement("div");
            pawn.id = index;
            pawn.setAttribute("firstMove", "true")
            pawn.className = "pawnOp";
            let pawnImage = document.createElement("img");
            pawnImage.src = "pawn.png";
            pawn.appendChild(pawnImage);
            item.appendChild(pawn);
        } else if (index == 56 || index == 63) {
            let rook = document.createElement("div");
            rook.id = index;
            rook.className = "pawn rook";
            let rookImage = document.createElement("img");
            rookImage.src = "rook.png";
            rook.appendChild(rookImage);
            item.appendChild(rook);
        }
        else if (index == 0 || index == 7) {
            let rook = document.createElement("div");
            rook.id = index;
            rook.className = "pawnOp rookOp";
            let rookImage = document.createElement("img");
            rookImage.src = "rook.png";
            rook.appendChild(rookImage);
            item.appendChild(rook);
        }
        else if (index == 57 || index == 62) {
            let knight = document.createElement("div");
            knight.id = index;
            knight.className = "pawn knight";
            let knightImage = document.createElement("img");
            knightImage.src = "knight.png";
            knight.appendChild(knightImage);
            item.appendChild(knight);
        }
        else if (index == 1 || index == 6) {
            let knight = document.createElement("div");
            knight.className = "pawnOp knightOp";
            knight.id = index;

            let knightImage = document.createElement("img");
            knightImage.src = "knight.png";
            knight.appendChild(knightImage);
            item.appendChild(knight);
        }
        else if (index == 58 || index == 61) {
            let bishop = document.createElement("div");
            bishop.className = "pawn bishop";
            bishop.id = index;
            let bishopImage = document.createElement("img");
            bishopImage.src = "bishop.png";
            bishop.appendChild(bishopImage);
            item.appendChild(bishop);
        } else if (index == 2 || index == 5) {
            let bishop = document.createElement("div");
            bishop.className = "pawnOp bishopOp";
            bishop.id = index;
            let bishopImage = document.createElement("img");
            bishopImage.src = "bishop.png";
            bishop.appendChild(bishopImage);
            item.appendChild(bishop);
        } else if (index == 59) {
            let queen = document.createElement("div");
            queen.className = "pawn queen";
            queen.id = index;
            let queenImage = document.createElement("img");
            queenImage.src = "queen.png";
            queen.appendChild(queenImage);
            item.appendChild(queen);
        }
        else if (index == 3) {
            let queen = document.createElement("div");
            queen.className = "pawnOp queenOp";
            queen.id = index;
            let queenImage = document.createElement("img");
            queenImage.src = "queen.png";
            queen.appendChild(queenImage);
            item.appendChild(queen);
        }
        else if (index == 60) {
            let king = document.createElement("div");
            king.className = "pawn king";
            king.id = index;
            let kingImage = document.createElement("img");
            kingImage.src = "king.png";
            king.appendChild(kingImage);
            item.appendChild(king);
        }
        else if (index == 4) {
            let king = document.createElement("div");
            king.className = "pawnOp kingOp";
            king.id = index;
            let kingImage = document.createElement("img");
            kingImage.src = "king.png";
            king.appendChild(kingImage);
            item.appendChild(king);
        }
    })
}
console.log(board)
/**********making board ends here*******/

board.addEventListener("click", (e) => {

    const pawnOp = e.target.closest(".pawnOp");
    const pawn = e.target.closest(".pawn");
    const bishop = e.target.closest(".bishop, .bishopOp");
    const rook = e.target.closest(".rook, .rookOp");
    const knight = e.target.closest(".knight, .knightOp");
    const queen = e.target.closest(".queen, .queenOp");
    const king = e.target.closest(".king, .kingOp");
    if (pawnOp && !bishop && !rook && !knight && !queen && !king) {
        const currentActive = board.querySelector("img.active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        const img = pawnOp.querySelector("img");
        if (img) {
            img.classList.add("active");
        }
        if (pawnOp.className === "pawnOp") {

            if (turn === "Ops") {
                pawnOpponentMoveSet(pawnOp);
            }
        }
    } else if (pawn && !bishop && !rook && !knight && !queen && !king) {
        const currentActive = board.querySelector("img.active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        const img = pawn.querySelector("img");
        if (img) {
            img.classList.add("active");
        }
        if (pawn.className === "pawn") {
            if (turn === "enemy") {
                pawnMoveSet(pawn);
            }
        }

    } else if (bishop) {
        console.log(bishop)
        const currentActive = board.querySelector("img.active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        const img = bishop.querySelector("img");
        if (img) {
            img.classList.add("active");
        }
        if (bishop.classList.contains("bishop")) {
            if (turn === "enemy") {
                bishopMoveSet(bishop)
            }
        } else if (bishop.classList.contains("bishopOp")) {
            if (turn === "Ops") {
                bishopOpponentMoveSet(bishop)
            }
        }
    } else if (rook) {
        const currentActive = board.querySelector("img.active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        const img = rook.querySelector("img");
        if (img) {
            img.classList.add("active");
        }
        if (rook.classList.contains("rook")) {
            if (turn === "enemy") {
                rookMoveSet(rook);
            }
        } else if (rook.classList.contains("rookOp")) {
            if (turn === "Ops") {
                rookOpponentMoveSet(rook);
            }
        }
    } else if (knight) {
        const currentActive = board.querySelector("img.active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        const img = knight.querySelector("img");
        if (img) {
            img.classList.add("active");
        }
        if (knight.classList.contains("knight")) {
            if (turn === "enemy") {
                knightMoveSet(knight);
            }
        } else if (knight.classList.contains("knightOp")) {
            if (turn === "Ops") {
                knightOpponentMoveSet(knight);
            }
        }
    } else if (queen) {
        const currentActive = board.querySelector("img.active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        const img = queen.querySelector("img");
        if (img) {
            img.classList.add("active");
        }
        if (queen.classList.contains("queen")) {
            if (turn === "enemy") {
                queenMoveSet(queen);
            }
        } else if (queen.classList.contains("queenOp")) {
            if (turn === "Ops") {
                queenOpponentMoveSet(queen);
            }
        }
    } else if (king) {
        const currentActive = board.querySelector("img.active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        const img = king.querySelector("img");
        if (img) {
            img.classList.add("active");
        }
        if (king.classList.contains("king")) {
            if (turn === "enemy") {
                kingMoveSet(king);
            }
        } else if (king.classList.contains("kingOp")) {
            if (turn === "Ops") {
                kingOpponentMoveSet(king)
            }
        }
    }
})
function isSquareAttacked(targetPos, attackingSide) {

    const suffix = attackingSide === "opponent" ? "Op" : "";

    const enemyPieces = board.querySelectorAll(
        `.pawn${suffix}, .knight${suffix}, .bishop${suffix}, .rook${suffix}, .queen${suffix}, .king${suffix}`
    );

    const gridItems = board.querySelectorAll(".gridElement");

    const targetRow = Math.floor(targetPos / 8);
    const targetCol = targetPos % 8;

    for (const piece of enemyPieces) {

        const piecePos = Number(piece.id);

        const pieceRow = Math.floor(piecePos / 8);
        const pieceCol = piecePos % 8;

        const rowDiff = targetRow - pieceRow;
        const colDiff = targetCol - pieceCol;

        const isKnight = piece.classList.contains(`knight${suffix}`);
        const isBishop = piece.classList.contains(`bishop${suffix}`);
        const isRook = piece.classList.contains(`rook${suffix}`);
        const isQueen = piece.classList.contains(`queen${suffix}`);
        const isKing = piece.classList.contains(`king${suffix}`);

        const isPawn = !isKnight && !isBishop &&
            !isRook && !isQueen && !isKing;

        // Pawn attacks
        if (isPawn) {

            const pawnDirection = attackingSide === "opponent" ? 1 : -1;

            if (
                rowDiff === pawnDirection &&
                Math.abs(colDiff) === 1
            ) {
                return true;
            }
        }

        // Knight attacks
        if (isKnight) {

            if (
                (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
                (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2)
            ) {
                return true;
            }
        }

        // King attacks
        if (isKing) {

            if (
                Math.abs(rowDiff) <= 1 &&
                Math.abs(colDiff) <= 1 &&
                (rowDiff !== 0 || colDiff !== 0)
            ) {
                return true;
            }
        }

        // Bishop, Rook and Queen attacks
        const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);
        const isStraight = rowDiff === 0 || colDiff === 0;

        const canMoveDiagonal = isBishop || isQueen;
        const canMoveStraight = isRook || isQueen;

        if (
            (canMoveDiagonal && isDiagonal && rowDiff !== 0) ||
            (canMoveStraight && isStraight && rowDiff + colDiff !== 0)
        ) {

            const rowStep = Math.sign(rowDiff);
            const colStep = Math.sign(colDiff);

            let row = pieceRow + rowStep;
            let col = pieceCol + colStep;

            let pathBlocked = false;

            while (row !== targetRow || col !== targetCol) {

                const squarePos = row * 8 + col;
                const square = gridItems[squarePos];

                if (square?.querySelector(".pawn, .pawnOp")) {
                    pathBlocked = true;
                    break;
                }

                row += rowStep;
                col += colStep;
            }

            if (!pathBlocked) {
                return true;
            }
        }
    }

    return false;
}
function clearSelection() {
    const squares = board.querySelectorAll(".gridElement");
    squares.forEach((square) => {
        square.onclick = null;

        const marker = square.querySelector(".marker");
        if (marker) marker.remove();

        const danger = square.querySelector(".danger");
        if (danger) danger.classList.remove("danger");

        const pieces = square.querySelectorAll(".pawn, .pawnOp");

        pieces.forEach(piece => {
            piece.onclick = null;
        });
    });
}
function isMoveSafe(piece, targetSquare, side) {

    const originalSquare = piece.parentElement;
    const originalId = piece.id;

    const capturedPiece = targetSquare.querySelector(".pawn, .pawnOp");
    const capturedParent = capturedPiece?.parentElement;

    const capturedId = capturedPiece?.id;

    if (capturedPiece) {
        capturedPiece.remove();
    }

    targetSquare.appendChild(piece);
    piece.id = targetSquare.id;

    const isSafe = !isKingInCheck(side);

    originalSquare.appendChild(piece);
    piece.id = originalId;

    if (capturedPiece) {
        capturedParent.appendChild(capturedPiece);
        capturedPiece.id = capturedId;
    }

    return isSafe;
}
function isKingInCheck(side) {

    const king = side === "my"
        ? board.querySelector(".pawn.king")
        : board.querySelector(".pawnOp.kingOp");

    if (!king) return false;

    const kingPos = Number(king.id);

    const attackingSide = side === "my"
        ? "opponent"
        : "my";

    return isSquareAttacked(kingPos, attackingSide);
}
function kingOpponentMoveSet(kingOp) {

    clearSelection();

    console.log("king clicked", kingOp);

    const kingPos = Number(kingOp.id);
    let positionArr = [];

    // Up
    if (kingPos >= 8) {
        positionArr.push(kingPos - 8);
    }

    // Up right
    if (kingPos >= 8 && kingPos % 8 !== 7) {
        positionArr.push(kingPos - 7);
    }

    // Down
    if (kingPos <= 55) {
        positionArr.push(kingPos + 8);
    }

    // Down right
    if (kingPos <= 54 && kingPos % 8 !== 7) {
        positionArr.push(kingPos + 9);
    }

    // Right
    if (kingPos % 8 !== 7) {
        positionArr.push(kingPos + 1);
    }

    // Left
    if (kingPos % 8 !== 0) {
        positionArr.push(kingPos - 1);
    }

    // Up left
    if (kingPos >= 8 && kingPos % 8 !== 0) {
        positionArr.push(kingPos - 9);
    }

    // Down left
    if (kingPos <= 55 && kingPos % 8 !== 0) {
        positionArr.push(kingPos + 7);
    }

    positionArr.forEach((item) => {

        const getElement = board.querySelectorAll(".gridElement")[item];

        if (!getElement) return;

        // Check opponent King's safety
        if (isSquareAttacked(item, "my")) return;

        const marker = document.createElement("div");
        marker.className = "marker";

        getElement.appendChild(marker);

        const isPawnBlockThere = getElement.querySelector(".pawn, .pawnOp");

        if (isPawnBlockThere) {

            const isBlockIsEnemy = isPawnBlockThere.classList.contains("pawn");

            if (isBlockIsEnemy) {

                getElement.querySelector(".marker")?.remove();

                const img = isPawnBlockThere.querySelector("img");

                if (img) img.classList.add("danger");

                isPawnBlockThere.onclick = (e) => {

                    e.stopPropagation();

                    OpsFinishedPawns.appendChild(isPawnBlockThere);

                    const dangerEl = isPawnBlockThere.querySelector("img");
                    dangerEl?.classList.remove("danger");

                    getElement.appendChild(kingOp);
                    kingOp.id = getElement.id;

                    clearSelection();
                    turn = "enemy";
                };

            } else {

                getElement.querySelector(".marker")?.remove();
            }

            return;
        }

        getElement.onclick = (e) => {

            e.stopPropagation();

            getElement.appendChild(kingOp);
            kingOp.id = getElement.id;

            clearSelection();
            turn = "enemy";
        };
    });
}
function kingMoveSet(king) {

    clearSelection();

    console.log("king clicked", king);

    const kingPos = Number(king.id);
    let positionArr = [];

    // Up
    if (kingPos >= 8) {
        positionArr.push(kingPos - 8);
    }

    // Up right
    if (kingPos >= 8 && kingPos % 8 !== 7) {
        positionArr.push(kingPos - 7);
    }

    // Down
    if (kingPos <= 55) {
        positionArr.push(kingPos + 8);
    }

    // Down right
    if (kingPos <= 54 && kingPos % 8 !== 7) {
        positionArr.push(kingPos + 9);
    }

    // Right
    if (kingPos % 8 !== 7) {
        positionArr.push(kingPos + 1);
    }

    // Left
    if (kingPos % 8 !== 0) {
        positionArr.push(kingPos - 1);
    }

    // Up left
    if (kingPos >= 8 && kingPos % 8 !== 0) {
        positionArr.push(kingPos - 9);
    }

    // Down left
    if (kingPos <= 55 && kingPos % 8 !== 0) {
        positionArr.push(kingPos + 7);
    }

    positionArr.forEach((item) => {

        const getElement = board.querySelectorAll(".gridElement")[item];

        if (!getElement) return;

        // Check your King's safety
        if (isSquareAttacked(item, "opponent")) return;

        const marker = document.createElement("div");
        marker.className = "marker";

        getElement.appendChild(marker);

        const isPawnBlockThere = getElement.querySelector(".pawn, .pawnOp");

        if (isPawnBlockThere) {

            const isBlockIsEnemy = isPawnBlockThere.classList.contains("pawnOp");

            if (isBlockIsEnemy) {

                getElement.querySelector(".marker")?.remove();

                const img = isPawnBlockThere.querySelector("img");

                if (img) img.classList.add("danger");

                isPawnBlockThere.onclick = (e) => {

                    e.stopPropagation();

                    FinshiedPawns.appendChild(isPawnBlockThere);

                    const dangerEl = isPawnBlockThere.querySelector("img");
                    dangerEl?.classList.remove("danger");

                    getElement.appendChild(king);
                    king.id = getElement.id;

                    clearSelection();
                    turn = "Ops";
                };

            } else {

                getElement.querySelector(".marker")?.remove();
            }

            return;
        }

        getElement.onclick = (e) => {

            e.stopPropagation();

            getElement.appendChild(king);
            king.id = getElement.id;

            clearSelection();
            turn = "Ops";
        };
    });
}
function queenOpponentMoveSet(queenOp) {
    console.log("queen clicked", queenOp)
    clearSelection()
    console.log("bishoped clicked", queenOp);
    const pos = parseInt(queenOp.id);
    console.log(pos)
    //this is for diagonally right up movement of yours
    for (let i = pos - 7; i >= 0; i -= 7) {
        // Prevent wrapping to another row
        if (Math.floor(i / 8) !== Math.floor((i + 7) / 8) - 1) {
            break;
        }
        console.log("bishop trail", i);
        const getElement = board.querySelector(`[id="${i}"]`);
        //this code is for if there is an friendly pawn we dont need to kill that friendly pawn         
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawn");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queenOp);
                    queenOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queenOp);
            queenOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    //this is for diagonally up left movement of yours
    for (let j = pos - 9; j >= 0; j -= 9) {
        //prevent row wrapping it is the boundary condition
        if (Math.floor(j / 8) !== Math.floor((j + 9) / 8) - 1) {
            break;
        }
        console.log("bishop trial second", j)
        const getElement = board.querySelector(`[id="${j}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawn");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queenOp);
                    queenOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                    // i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queenOp);
            queenOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    //this is for diagonally bottom right movement of yours
    for (let c = pos + 9; c <= 63; c += 9) {
        if (Math.floor(c / 8) !== Math.floor((c - 9) / 8) + 1) break;
        const getElement = board.querySelector(`[id="${c}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawn");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queenOp);
                    queenOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queenOp);
            queenOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    //this is for diagonally bottom left movement of yours
    for (let a = pos + 7; a <= 63; a += 7) {
        if (Math.floor(a / 8) !== Math.floor((a - 7) / 8) + 1) break;
        const getElement = board.querySelector(`[id="${a}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawn");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queenOp);
                    queenOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queenOp);
            queenOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }

    for (let i = pos - 8; i >= 0; i -= 8) {
        console.log("rooks trail", i);

        const getElement = board.querySelector(`[id="${i}"]`);

        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawn");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queenOp);
                    queenOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queenOp);
            queenOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    for (let f = pos + 8; f <= 63; f += 8) {
        console.log("rooks trail", f);

        const getElement = board.querySelector(`[id="${f}"]`);

        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawn");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queenOp);
                    queenOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queenOp);
            queenOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    // right horizontal position according to trail
    for (let j = pos + 1; j <= 63; j++) {
        if (Math.floor(j / 8) !== Math.floor(pos / 8)) {
            break;
        }
        console.log("this is horizontal trail", j);
        const getElement = board.querySelector(`[id="${j}"]`);

        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawn");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queenOp);
                    queenOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queenOp);
            queenOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    //left horizontal position according to trail
    for (let c = pos - 1; c >= 0; c--) {
        if (Math.floor(c / 8) !== Math.floor(pos / 8)) {
            break;
        }
        const getElement = board.querySelector(`[id="${c}"]`);

        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawn");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queenOp);
                    queenOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queenOp);
            queenOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
}
function queenMoveSet(queen) {
    console.log("queen clicked", queen)
    clearSelection()
    console.log("bishoped clicked", queen);
    const pos = parseInt(queen.id);
    console.log(pos)
    //this is for diagonally right up movement of yours
    for (let i = pos - 7; i >= 0; i -= 7) {
        // Prevent wrapping to another row
        if (Math.floor(i / 8) !== Math.floor((i + 7) / 8) - 1) {
            break;
        }
        console.log("bishop trail", i);
        const getElement = board.querySelector(`[id="${i}"]`);
        //this code is for if there is an friendly pawn we dont need to kill that friendly pawn         
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawnOp");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queen);
                    queen.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queen);
            queen.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    //this is for diagonally up left movement of yours
    for (let j = pos - 9; j >= 0; j -= 9) {
        //prevent row wrapping it is the boundary condition
        if (Math.floor(j / 8) !== Math.floor((j + 9) / 8) - 1) {
            break;
        }
        console.log("bishop trial second", j)
        const getElement = board.querySelector(`[id="${j}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawnOp");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queen);
                    queen.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queen);
            queen.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    //this is for diagonally bottom right movement of yours
    for (let c = pos + 9; c <= 63; c += 9) {
        if (Math.floor(c / 8) !== Math.floor((c - 9) / 8) + 1) break;
        const getElement = board.querySelector(`[id="${c}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawnOp");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queen);
                    queen.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queen);
            queen.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    //this is for diagonally bottom left movement of yours
    for (let a = pos + 7; a <= 63; a += 7) {
        if (Math.floor(a / 8) !== Math.floor((a - 7) / 8) + 1) break;
        const getElement = board.querySelector(`[id="${a}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawnOp");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queen);
                    queen.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queen);
            queen.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }

    for (let i = pos - 8; i >= 0; i -= 8) {
        console.log("rooks trail", i);

        const getElement = board.querySelector(`[id="${i}"]`);

        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawnOp");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queen);
                    queen.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queen);
            queen.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    for (let f = pos + 8; f <= 63; f += 8) {
        console.log("rooks trail", f);

        const getElement = board.querySelector(`[id="${f}"]`);

        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawnOp");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queen);
                    queen.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queen);
            queen.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    // right horizontal position according to trail
    for (let j = pos + 1; j <= 63; j++) {
        if (Math.floor(j / 8) !== Math.floor(pos / 8)) {
            break;
        }
        console.log("this is horizontal trail", j);
        const getElement = board.querySelector(`[id="${j}"]`);

        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawnOp");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queen);
                    queen.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queen);
            queen.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    //left horizontal position according to trail
    for (let c = pos - 1; c >= 0; c--) {
        if (Math.floor(c / 8) !== Math.floor(pos / 8)) {
            break;
        }
        const getElement = board.querySelector(`[id="${c}"]`);

        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawnOp");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(queen);
                    queen.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(queen);
            queen.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }

}
function knightOpponentMoveSet(knightOp) {
    clearSelection();
    console.log("knight clicked", knightOp);
    const knightPos = parseInt(knightOp.id);

    const row = Math.floor(knightPos / 8);
    const col = knightPos % 8;

    const positionArr = [];
    //boundaryConditions

    // 1. Top right: 2 up + 1 right
    if (row >= 2 && col < 7) {
        const pos = knightPos - 15;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 2. Top left: 2 up + 1 left
    if (row >= 2 && col > 0) {
        const pos = knightPos - 17;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 3. Bottom right: 2 down + 1 right
    if (row <= 5 && col < 7) {
        const pos = knightPos + 17;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 4. Bottom left: 2 down + 1 left
    if (row <= 5 && col > 0) {
        const pos = knightPos + 15;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 5. Right up: 2 right + 1 up
    if (row >= 1 && col <= 5) {
        const pos = knightPos - 6;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 6. Right down: 2 right + 1 down
    if (row <= 6 && col <= 5) {
        const pos = knightPos + 10;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 7. Left up: 2 left + 1 up
    if (row >= 1 && col >= 2) {
        const pos = knightPos - 10;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 8. Left down: 2 left + 1 down
    if (row <= 6 && col >= 2) {
        const pos = knightPos + 6;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }
    positionArr.forEach((item, index) => {
        if (!item) return;
        const marker = document.createElement("div");
        marker.className = "marker";
        item.appendChild(marker);


        const isPawnBlockThere = item.querySelector(".pawn, .pawnOp");

        if (isPawnBlockThere) {

            const isBlockIsEnemy = isPawnBlockThere.classList.contains("pawn");

            if (isBlockIsEnemy) {
                item.querySelector(".marker")?.remove();

                const img = isPawnBlockThere.querySelector("img");
                if (img) img.classList.add("danger");

                isPawnBlockThere.onclick = (e) => {
                    e.stopPropagation();

                    FinshiedPawns.appendChild(isPawnBlockThere);

                    const dangerEl = isPawnBlockThere.querySelector("img");
                    dangerEl.classList.remove("danger");

                    item.appendChild(knightOp);
                    knightOp.id = item.id;

                    clearSelection();
                    turn = "enemy";
                };

            } else {
                // Ally piece: no marker and no movement
                item.querySelector(".marker")?.remove();
            }

            return;
        }

        item.onclick = (e) => {
            e.stopPropagation();
            item.appendChild(knightOp);
            knightOp.id = item.id;
            clearSelection();
            turn = "enemy";
        }
    })

}
function knightMoveSet(knight) {
    clearSelection();
    console.log("knight clicked", knight);
    const knightPos = parseInt(knight.id);

    const row = Math.floor(knightPos / 8);
    const col = knightPos % 8;

    const positionArr = [];
    //boundaryConditions

    // 1. Top right: 2 up + 1 right
    if (row >= 2 && col < 7) {
        const pos = knightPos - 15;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 2. Top left: 2 up + 1 left
    if (row >= 2 && col > 0) {
        const pos = knightPos - 17;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 3. Bottom right: 2 down + 1 right
    if (row <= 5 && col < 7) {
        const pos = knightPos + 17;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 4. Bottom left: 2 down + 1 left
    if (row <= 5 && col > 0) {
        const pos = knightPos + 15;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 5. Right up: 2 right + 1 up
    if (row >= 1 && col <= 5) {
        const pos = knightPos - 6;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 6. Right down: 2 right + 1 down
    if (row <= 6 && col <= 5) {
        const pos = knightPos + 10;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 7. Left up: 2 left + 1 up
    if (row >= 1 && col >= 2) {
        const pos = knightPos - 10;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }

    // 8. Left down: 2 left + 1 down
    if (row <= 6 && col >= 2) {
        const pos = knightPos + 6;
        positionArr.push(board.querySelector(`[id="${pos}"]`));
    }
    positionArr.forEach((item, index) => {
        if (!item) return;

        const marker = document.createElement("div");
        marker.className = "marker";
        item.appendChild(marker);


        const isPawnBlockThere = item.querySelector(".pawn, .pawnOp");

        if (isPawnBlockThere) {

            const isBlockIsEnemy = isPawnBlockThere.classList.contains("pawnOp");

            if (isBlockIsEnemy) {
                item.querySelector(".marker")?.remove();

                const img = isPawnBlockThere.querySelector("img");
                if (img) img.classList.add("danger");

                isPawnBlockThere.onclick = (e) => {
                    e.stopPropagation();

                    OpsFinishedPawns.appendChild(isPawnBlockThere);

                    const dangerEl = isPawnBlockThere.querySelector("img");
                    dangerEl.classList.remove("danger");

                    item.appendChild(knight);
                    knight.id = item.id;

                    clearSelection();
                    turn = "Ops";
                };

            } else {
                // Ally piece: no marker and no movement
                item.querySelector(".marker")?.remove();
            }

            return;
        }

        item.onclick = (e) => {
            e.stopPropagation();
            item.appendChild(knight);
            knight.id = item.id;
            clearSelection();
            turn = "Ops";
        }
    })


}
function rookOpponentMoveSet(rookOp) {
    clearSelection();
    console.log(rookOp)
    const rookPos = parseInt(rookOp.id);
    console.log(rookPos)

    //detecting rook trail according to its current position
    //upward up position
    for (let i = rookPos - 8; i >= 0; i -= 8) {
        console.log("rooks trail", i);

        const getElement = board.querySelector(`[id="${i}"]`);
        if (!getElement) continue;

        if (!isMoveSafe(rookOp, getElement, "opponent")) continue;
        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawn");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(rookOp);
                    rookOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(rookOp);
            rookOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    for (let f = rookPos + 8; f <= 63; f += 8) {
        console.log("rooks trail", f);

        const getElement = board.querySelector(`[id="${f}"]`);
        if (!getElement) continue;

        if (!isMoveSafe(rookOp, getElement, "opponent")) continue;
        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawn");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(rookOp);
                    rookOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(rookOp);
            rookOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    // right horizontal position according to trail
    for (let j = rookPos + 1; j <= 63; j++) {
        if (Math.floor(j / 8) !== Math.floor(rookPos / 8)) {
            break;
        }
        console.log("this is horizontal trail", j);
        const getElement = board.querySelector(`[id="${j}"]`);
        if (!getElement) continue;

        if (!isMoveSafe(rookOp, getElement, "opponent")) continue;
        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawn");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(rookOp);
                    rookOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(rookOp);
            rookOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    //left horizontal position according to trail
    for (let c = rookPos - 1; c >= 0; c--) {
        if (Math.floor(c / 8) !== Math.floor(rookPos / 8)) {
            break;
        }
        const getElement = board.querySelector(`[id="${c}"]`);
        if (!getElement) continue;

        if (!isMoveSafe(rookOp, getElement, "opponent")) continue;
        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawn");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(rookOp);
                    rookOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(rookOp);
            rookOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
}
function rookMoveSet(rook) {
    clearSelection();
    console.log(rook)
    const rookPos = parseInt(rook.id);
    console.log(rookPos)

    //detecting rook trail according to its current position
    //upward up position
    for (let i = rookPos - 8; i >= 0; i -= 8) {
        console.log("rooks trail", i);

        const getElement = board.querySelector(`[id="${i}"]`);
        if (!getElement) continue;

        if (!isMoveSafe(rook, getElement, "my")) continue;
        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawnOp");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(rook);
                    rook.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(rook);
            rook.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    for (let f = rookPos + 8; f <= 63; f += 8) {
        console.log("rooks trail", f);

        const getElement = board.querySelector(`[id="${f}"]`);
        if (!getElement) continue;

        if (!isMoveSafe(rook, getElement, "my")) continue;
        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawnOp");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(rook);
                    rook.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(rook);
            rook.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    // right horizontal position according to trail
    for (let j = rookPos + 1; j <= 63; j++) {
        if (Math.floor(j / 8) !== Math.floor(rookPos / 8)) {
            break;
        }
        console.log("this is horizontal trail", j);
        const getElement = board.querySelector(`[id="${j}"]`);
        if (!getElement) continue;

        if (!isMoveSafe(rook, getElement, "my")) continue;
        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawnOp");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(rook);
                    rook.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(rook);
            rook.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    //left horizontal position according to trail
    for (let c = rookPos - 1; c >= 0; c--) {
        if (Math.floor(c / 8) !== Math.floor(rookPos / 8)) {
            break;
        }
        const getElement = board.querySelector(`[id="${c}"]`);
        if (!getElement) continue;

        if (!isMoveSafe(rook, getElement, "my")) continue;
        console.log(getElement)
        const isThereAnyBlockInTrail = getElement.querySelector(".pawn,.pawnOp");
        if (isThereAnyBlockInTrail) {
            const isTHatAnEnemyBlock = isThereAnyBlockInTrail.classList.contains("pawnOp");

            if (isTHatAnEnemyBlock) {
                console.log(true, isThereAnyBlockInTrail);
                const img = isThereAnyBlockInTrail.querySelector("img");
                img.classList.add("danger");

                isThereAnyBlockInTrail.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isThereAnyBlockInTrail);
                    const dangerEl = isThereAnyBlockInTrail.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(rook);
                    rook.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                }
            }
            break;
        }
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);


        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(rook);
            rook.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
}
function bishopMoveSet(bishop) {
    clearSelection()
    console.log("bishoped clicked", bishop);
    const pos = parseInt(bishop.id);
    console.log(pos)
    //this is for diagonally right up movement of yours
    for (let i = pos - 7; i >= 0; i -= 7) {
        // Prevent wrapping to another row
        if (Math.floor(i / 8) !== Math.floor((i + 7) / 8) - 1) {
            break;
        }
        console.log("bishop trail", i);
        const getElement = board.querySelector(`[id="${i}"]`);

        //this code is for if there is an friendly pawn we dont need to kill that friendly pawn         
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawnOp");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(bishop);
                    bishop.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(bishop);
            bishop.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    //this is for diagonally up left movement of yours
    for (let j = pos - 9; j >= 0; j -= 9) {
        //prevent row wrapping it is the boundary condition
        if (Math.floor(j / 8) !== Math.floor((j + 9) / 8) - 1) {
            break;
        }
        console.log("bishop trial second", j)
        const getElement = board.querySelector(`[id="${j}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawnOp");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(bishop);
                    bishop.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(bishop);
            bishop.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    //this is for diagonally bottom right movement of yours
    for (let c = pos + 9; c <= 63; c += 9) {
        if (Math.floor(c / 8) !== Math.floor((c - 9) / 8) + 1) break;
        const getElement = board.querySelector(`[id="${c}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawnOp");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(bishop);
                    bishop.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(bishop);
            bishop.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
    //this is for diagonally bottom left movement of yours
    for (let a = pos + 7; a <= 63; a += 7) {
        if (Math.floor(a / 8) !== Math.floor((a - 7) / 8) + 1) break;
        const getElement = board.querySelector(`[id="${a}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawnOp");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    OpsFinishedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(bishop);
                    bishop.id = getElement.id;
                    clearSelection();
                    turn = "Ops"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(bishop);
            bishop.id = getElement.id;
            clearSelection();
            turn = "Ops"
        }
    }
}
function bishopOpponentMoveSet(bishopOp) {
    clearSelection()
    console.log("bishoped clicked", bishopOp);
    const pos = parseInt(bishopOp.id);
    console.log(pos)
    //this is for diagonally right up movement of yours
    for (let i = pos - 7; i >= 0; i -= 7) {
        // Prevent wrapping to another row
        if (Math.floor(i / 8) !== Math.floor((i + 7) / 8) - 1) {
            break;
        }
        console.log("bishop trail", i);
        const getElement = board.querySelector(`[id="${i}"]`);
        //this code is for if there is an friendly pawn we dont need to kill that friendly pawn         
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawn");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(bishopOp);
                    bishopOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(bishopOp);
            bishopOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    //this is for diagonally up left movement of yours
    for (let j = pos - 9; j >= 0; j -= 9) {
        //prevent row wrapping it is the boundary condition
        if (Math.floor(j / 8) !== Math.floor((j + 9) / 8) - 1) {
            break;
        }
        console.log("bishop trial second", j)
        const getElement = board.querySelector(`[id="${j}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawn");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(bishopOp);
                    bishopOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(bishopOp);
            bishopOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    //this is for diagonally bottom right movement of yours
    for (let c = pos + 9; c <= 63; c += 9) {
        if (Math.floor(c / 8) !== Math.floor((c - 9) / 8) + 1) break;
        const getElement = board.querySelector(`[id="${c}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawn");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(bishopOp);
                    bishopOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                    //i was working here last night
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(bishopOp);
            bishopOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
    //this is for diagonally bottom left movement of yours
    for (let a = pos + 7; a <= 63; a += 7) {
        if (Math.floor(a / 8) !== Math.floor((a - 7) / 8) + 1) break;
        const getElement = board.querySelector(`[id="${a}"]`);
        console.log(getElement);
        const isPawnisThere = getElement.querySelector(".pawn, .pawnOp");
        if (isPawnisThere) {
            console.log(isPawnisThere)
            const isThereAnOpponentPawn = isPawnisThere.classList.contains("pawn");
            if (isThereAnOpponentPawn) {
                console.log(getElement)
                const img = isPawnisThere.querySelector("img");
                img.classList.add("danger")
                isPawnisThere.onclick = (e) => {
                    e.stopPropagation();
                    FinshiedPawns.appendChild(isPawnisThere);
                    const dangerEl = isPawnisThere.querySelector("img");
                    dangerEl.classList.remove("danger")
                    getElement.appendChild(bishopOp);
                    bishopOp.id = getElement.id;
                    clearSelection();
                    turn = "enemy"
                }
            }
            break;
        };

        console.log(getElement);
        const marker = document.createElement("div");
        marker.className = "marker";
        getElement.appendChild(marker);

        getElement.onclick = (e) => {
            e.stopPropagation();
            console.log("box clicked")
            getElement.appendChild(bishopOp);
            bishopOp.id = getElement.id;
            clearSelection();
            turn = "enemy"
        }
    }
}
function pawnOpponentMoveSet(pawnOp) {
    console.dir(pawnOp)
    const pawnPos = parseInt(pawnOp.id);
    console.log(pawnPos)
    const firstMove = pawnOp.getAttribute("firstMove");
    console.log(firstMove)
    const getElement = board.querySelectorAll(".gridElement");
    //first clear all active dots marker before selecting any another pawn
    clearSelection();
    if (firstMove === "true") {
        //first case when its start of the game pawn can move two steps
        firstChoice = pawnPos + 16;

        getElement.forEach((item, index) => {
            const oneStep = index === pawnPos + 8;
            const twoStep = index === pawnPos + 16;
            const col = pawnPos % 8;

            const diagonalLeftEnemyPos = col > 0 ? pawnPos + 7 : -1;
            const diagonalRightEnemyPos = col < 7 ? pawnPos + 9 : -1;
            const occupied = item.querySelector(".pawn, .pawnOp");
            const middleSquare = getElement[pawnPos + 8];

            const middleOccupied = middleSquare.querySelector(".pawn, .pawnOp");

            if (
                (oneStep && !occupied) ||
                (twoStep && !occupied && !middleOccupied)
            ) {
                const marker = document.createElement("div");
                marker.className = "marker";
                item.appendChild(marker)

                if (turn === "Ops") {
                    item.onclick = (e) => {
                        e.stopPropagation();
                        console.log(item)
                        console.log(pawnOp)
                        const copyPawn = pawnOp;
                        pawnOp.remove();
                        item.appendChild(copyPawn);
                        copyPawn.id = item.id;
                        pawnOp.setAttribute("firstMove", "false");
                        clearSelection();
                        turn = "enemy"
                    }
                }
            }
            if (index === diagonalLeftEnemyPos) {
                console.log(item);
                const isEnemythere = item.querySelector(".pawn");
                if (isEnemythere) {
                    const img = isEnemythere.querySelector("img");
                    if (img) {
                        img.classList.add("danger");
                    }

                    item.onclick = (e) => {
                        e.stopPropagation();
                        FinshiedPawns.appendChild(isEnemythere);
                        const img = isEnemythere.querySelector("img");
                        img.classList.remove("danger")
                        item.appendChild(pawnOp);
                        pawnOp.id = item.id;
                        pawnOp.setAttribute("firstMove", "false");

                        clearSelection();
                        turn = "enemy"

                    }

                }

            }
            if (index === diagonalRightEnemyPos) {
                console.log(item);
                const isEnemythere = item.querySelector(".pawn");
                if (isEnemythere) {
                    const img = isEnemythere.querySelector("img");
                    if (img) {
                        img.classList.add("danger");
                    }

                    item.onclick = (e) => {
                        e.stopPropagation();
                        FinshiedPawns.appendChild(isEnemythere);
                        const img = isEnemythere.querySelector("img");
                        img.classList.remove("danger")
                        item.appendChild(pawnOp);
                        pawnOp.id = item.id;
                        pawnOp.setAttribute("firstMove", "false");

                        clearSelection();
                        turn = "enemy"
                    }

                }

            }


        })
    } else {
        //second case u need to move a step ahead;
        secondChoice = pawnPos + 8;
        // your diagonal logic directly here
        const col = pawnPos % 8;

        const leftDiagonal = col > 0 ? pawnPos + 7 : -1;
        const rightDiagonal = col < 7 ? pawnPos + 9 : -1;
        const straightPawnPos = pawnPos + 8;
        const getElement = board.querySelectorAll(".gridElement");

        getElement.forEach((item) => {

            if (item.id == leftDiagonal) {
                console.log("Left diagonal", item);
                const isEnemythere = item.querySelector(".pawn");
                if (isEnemythere) {
                    const img = isEnemythere.querySelector("img");
                    img.classList.add("danger");
                    item.onclick = (e) => {
                        e.stopPropagation();
                        const enemyCopy = isEnemythere;
                        console.log(isEnemythere)
                        const img2 = isEnemythere.querySelector("img");
                        img2.classList.remove("danger")
                        FinshiedPawns.appendChild(isEnemythere);
                        const opsPawnCopy = pawnOp;
                        console.log(enemyCopy);
                        console.log("this is enemyPawn", item)
                        opsPawnCopy.id = item.id;
                        item.appendChild(opsPawnCopy)
                        console.log(opsPawnCopy);
                        clearSelection();
                        turn = "enemy"
                    }
                }
            } else if (item.id == rightDiagonal) {
                console.log("Right diagonal", item);

                const isEnemythere = item.querySelector(".pawn");

                if (isEnemythere) {
                    const img = isEnemythere.querySelector("img");
                    img.classList.add("danger");
                    item.onclick = (e) => {
                        e.stopPropagation();
                        const enemyCopy = isEnemythere;
                        console.log(isEnemythere)
                        const img2 = isEnemythere.querySelector("img");
                        img2.classList.remove("danger")
                        FinshiedPawns.appendChild(isEnemythere);
                        const opsPawnCopy = pawnOp;
                        console.log(enemyCopy);
                        console.log("this is enemyPawn", item)
                        opsPawnCopy.id = item.id;
                        item.appendChild(opsPawnCopy)
                        console.log(opsPawnCopy);
                        clearSelection();
                        turn = "enemy"
                    }
                }
            }
            else if (item.id == straightPawnPos) {
                const pawn = item.querySelector(".pawn");
                if (!pawn) {
                    const marker = document.createElement("div");
                    marker.className = "marker";
                    item.appendChild(marker)

                    item.onclick = (e) => {
                        e.stopPropagation();

                        item.appendChild(pawnOp);

                        pawnOp.id = item.id;
                        pawnOp.setAttribute("firstMove", "false");
                        clearSelection();

                        turn = "enemy";
                    }

                }

            }
        });

        //third case u can move diagonally left if theres oppponent to kill him
        thirdChoice = (pawnPos + 8) - 1;
        //fourth case u can move diagonally right if theres opponent to kill hhim
        fourthChoice = (pawnPos + 8) + 1;
    }


}

function pawnMoveSet(pawn) {
    console.dir(pawn)
    const pawnPos = parseInt(pawn.id);
    console.log(pawnPos)
    const firstMove = pawn.getAttribute("firstMove");
    console.log(firstMove)
    let firstChoice;
    const col = pawnPos % 8;

    const diagonalLeftEnemyPos = col > 0 ? pawnPos - 9 : -1;
    const diagonalRightEnemyPos = col < 7 ? pawnPos - 7 : -1;
    if (firstMove === "true") {
        //first case when its start of the game pawn can move two steps
        firstChoice = pawnPos - 16;
        const getElement = board.querySelectorAll(".gridElement");
        //first clear all active dots marker before selecting any another pawn
        clearSelection();
        getElement.forEach((item, index) => {
            const oneStep = index === firstChoice + 8;
            const twoStep = index === firstChoice;

            const occupied = item.querySelector(".pawn, .pawnOp");
            const middleSquare = getElement[firstChoice + 8];

            const middleOccupied = middleSquare.querySelector(".pawn, .pawnOp");

            if (
                (oneStep && !occupied) ||
                (twoStep && !occupied && !middleOccupied)
            ) {
                const enemyIsThereOrNot = item.querySelector(".pawnOp");
                console.log(item.id, pawn.id)
                const pawnStartId = (parseInt(pawn.id) - 7) === parseInt(item.id);
                console.log(pawnStartId);
                if (!enemyIsThereOrNot) {
                    const marker = document.createElement("div");
                    marker.className = "marker";

                    item.appendChild(marker)
                }
                if (!enemyIsThereOrNot && turn === "enemy") {
                    item.onclick = (e) => {
                        e.stopPropagation();
                        console.log(item)
                        console.log(pawn)
                        const copyPawn = pawn;
                        pawn.remove();
                        item.appendChild(copyPawn);
                        copyPawn.id = item.id;
                        pawn.setAttribute("firstMove", "false");
                        clearSelection();
                        turn = "Ops"
                    }
                }
            }
            if (index === diagonalLeftEnemyPos) {
                console.log(item);
                const isEnemythere = item.querySelector(".pawnOp");
                if (isEnemythere) {
                    const img = isEnemythere.querySelector("img");
                    if (img) {
                        img.classList.add("danger");
                    }

                    item.onclick = (e) => {
                        e.stopPropagation();
                        OpsFinishedPawns.appendChild(isEnemythere);
                        const img = isEnemythere.querySelector("img");
                        img.classList.remove("danger")
                        item.appendChild(pawn);
                        pawn.id = item.id;
                        pawn.setAttribute("firstMove", "false");

                        clearSelection();
                        turn = "Ops"

                    }

                }

            }
            if (index === diagonalRightEnemyPos) {
                console.log(item);
                const isEnemythere = item.querySelector(".pawnOp");
                if (isEnemythere) {
                    const img = isEnemythere.querySelector("img");
                    if (img) {
                        img.classList.add("danger");
                    }

                    item.onclick = (e) => {
                        e.stopPropagation();
                        OpsFinishedPawns.appendChild(isEnemythere);
                        const img = isEnemythere.querySelector("img");
                        img.classList.remove("danger")
                        item.appendChild(pawn);
                        pawn.id = item.id;
                        pawn.setAttribute("firstMove", "false");

                        clearSelection();
                        turn = "Ops"
                    }

                }

            }

        })
    } else {
        //second case u need to move a step ahead;
        secondChoice = pawnPos + 8;
        // your diagonal logic directly here
        const upleftDiagonal = (pawnPos - 8) - 1;
        const uprightDiagonal = (pawnPos - 8) + 1;
        const straightPawnPos = pawnPos - 8;
        const getElement = board.querySelectorAll(".gridElement");
        clearSelection();
        getElement.forEach((item) => {

            if (item.id == upleftDiagonal) {
                console.log("Left diagonal", item);
                const isEnemythere = item.querySelector(".pawnOp");

                if (isEnemythere) {
                    const img = isEnemythere.querySelector("img");
                    img.classList.add("danger");
                    item.onclick = (e) => {
                        e.stopPropagation();
                        const enemyCopy = isEnemythere;
                        console.log(isEnemythere)
                        const img2 = isEnemythere.querySelector("img");
                        img2.classList.remove("danger")
                        OpsFinishedPawns.appendChild(isEnemythere);
                        const opsPawnCopy = pawn;
                        console.log(enemyCopy);
                        console.log("this is enemyPawn", item)
                        opsPawnCopy.id = item.id;
                        item.appendChild(opsPawnCopy)
                        console.log(opsPawnCopy);
                        clearSelection();
                        turn = "Ops"
                    }
                }
            } else if (item.id == uprightDiagonal) {
                console.log("Right diagonal", item);

                const isEnemythere = item.querySelector(".pawnOp");

                if (isEnemythere) {
                    const img = isEnemythere.querySelector("img");
                    img.classList.add("danger");
                    item.onclick = (e) => {
                        e.stopPropagation();
                        const enemyCopy = isEnemythere;
                        console.log(isEnemythere)
                        const img2 = isEnemythere.querySelector("img");
                        img2.classList.remove("danger")
                        OpsFinishedPawns.appendChild(isEnemythere);
                        const opsPawnCopy = pawn;
                        console.log(enemyCopy);
                        console.log("this is enemyPawn", item)
                        opsPawnCopy.id = item.id;
                        item.appendChild(opsPawnCopy)
                        console.log(opsPawnCopy);
                        clearSelection();
                        turn = "Ops"
                    }
                }
            }
            if (item.id == straightPawnPos) {
                const pawnOp = item.querySelector(".pawnOp");

                if (!pawnOp) {
                    const marker = document.createElement("div");
                    marker.className = "marker";
                    item.appendChild(marker);
                    console.log(item, pawnOp, pawn)
                    item.onclick = (e) => {
                        e.stopPropagation();

                        item.appendChild(pawn);

                        pawn.id = item.id;
                        pawn.setAttribute("firstMove", "false");

                        clearSelection();

                        turn = "Ops";
                    };
                }
            }
        });

        //third case u can move diagonally left if theres oppponent to kill him
        thirdChoice = (pawnPos + 8) - 1;
        //fourth case u can move diagonally right if theres opponent to kill hhim
        fourthChoice = (pawnPos + 8) + 1;
    }

}



function getPieceAt(index) {
    const squares = board.querySelectorAll(".gridElement");
    return squares[index].querySelector(".pawn, .pawnOp");
}

function isEnemyPiece(piece, side) {
    if (side === "my") {
        return piece.classList.contains("pawnOp");
    } else {
        return piece.classList.contains("pawn");
    }
}

function getStepMoves(pos, offsets, side) {
    let result = [];
    const row = Math.floor(pos / 8);
    const col = pos % 8;

    offsets.forEach((offset) => {
        const newRow = row + offset[0];
        const newCol = col + offset[1];

        if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) return;

        const index = newRow * 8 + newCol;
        const piece = getPieceAt(index);

        if (!piece || isEnemyPiece(piece, side)) {
            result.push(index);
        }
    });
    return result;
}

function getSlidingMoves(pos, directions, side) {
    let result = [];
    const row = Math.floor(pos / 8);
    const col = pos % 8;

    directions.forEach((dir) => {
        let r = row + dir[0];
        let c = col + dir[1];

        while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
            const index = r * 8 + c;
            const piece = getPieceAt(index);

            if (!piece) {
                result.push(index);
            } else {
                if (isEnemyPiece(piece, side)) {
                    result.push(index);
                }
                break;
            }
            r += dir[0];
            c += dir[1];
        }
    });
    return result;
}

function getPossibleMoves(piece, side) {
    const pos = Number(piece.id);
    const row = Math.floor(pos / 8);
    const col = pos % 8;
    let moves = [];

    const isKnight = piece.classList.contains("knight") || piece.classList.contains("knightOp");
    const isBishop = piece.classList.contains("bishop") || piece.classList.contains("bishopOp");
    const isRook = piece.classList.contains("rook") || piece.classList.contains("rookOp");
    const isQueen = piece.classList.contains("queen") || piece.classList.contains("queenOp");
    const isKing = piece.classList.contains("king") || piece.classList.contains("kingOp");

    const diagonals = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    const straights = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    if (isKnight) {
        const knightOffsets = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [1, -2], [-1, 2], [1, 2]];
        moves = getStepMoves(pos, knightOffsets, side);
    } else if (isKing) {
        moves = getStepMoves(pos, diagonals.concat(straights), side);
    } else if (isBishop) {
        moves = getSlidingMoves(pos, diagonals, side);
    } else if (isRook) {
        moves = getSlidingMoves(pos, straights, side);
    } else if (isQueen) {
        moves = getSlidingMoves(pos, diagonals.concat(straights), side);
    } else {
        // this is a normal pawn
        const direction = side === "my" ? -1 : 1;
        const startRow = side === "my" ? 6 : 1;

        const oneStepRow = row + direction;
        if (oneStepRow >= 0 && oneStepRow <= 7) {
            const oneStepIndex = oneStepRow * 8 + col;
            if (!getPieceAt(oneStepIndex)) {
                moves.push(oneStepIndex);

                const twoStepIndex = (row + direction * 2) * 8 + col;
                if (row === startRow && !getPieceAt(twoStepIndex)) {
                    moves.push(twoStepIndex);
                }
            }

            if (col > 0) {
                const leftIndex = oneStepRow * 8 + (col - 1);
                const leftPiece = getPieceAt(leftIndex);
                if (leftPiece && isEnemyPiece(leftPiece, side)) {
                    moves.push(leftIndex);
                }
            }
            if (col < 7) {
                const rightIndex = oneStepRow * 8 + (col + 1);
                const rightPiece = getPieceAt(rightIndex);
                if (rightPiece && isEnemyPiece(rightPiece, side)) {
                    moves.push(rightIndex);
                }
            }
        }
    }
    return moves;
}

function hasAnyLegalMove(side) {
    const squares = board.querySelectorAll(".gridElement");
    const myPieces = side === "my"
        ? board.querySelectorAll(".pawn")
        : board.querySelectorAll(".pawnOp");

    for (const piece of myPieces) {
        const moves = getPossibleMoves(piece, side);

        for (const targetIndex of moves) {
            if (isMoveSafe(piece, squares[targetIndex], side)) {
                return true;
            }
        }
    }
    return false;
}

// this is the game over message box
function showGameOver(message) {
    const box = document.createElement("div");
    box.id = "gameOverBox";
    box.style.cssText =
        "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);" +
        "background:black;color:white;padding:30px 50px;font-size:28px;" +
        "text-align:center;border-radius:10px;z-index:9999;";
    box.innerText = message;

    const button = document.createElement("button");
    button.innerText = "Play Again";
    button.style.cssText = "display:block;margin:20px auto 0;padding:8px 20px;font-size:18px;";
    button.onclick = () => {
        location.reload();
    };

    box.appendChild(button);
    document.body.appendChild(box);
}

function showCheckMessage(side) {
    hideCheckMessage();
    const msg = document.createElement("div");
    msg.id = "checkMessage";
    msg.style.cssText =
        "position:fixed;top:10px;left:50%;transform:translateX(-50%);" +
        "background:crimson;color:white;padding:10px 30px;font-size:22px;" +
        "border-radius:8px;z-index:9998;";
    if (side === "my") {
        msg.innerText = "Check! Your king (bottom) is in check";
    } else {
        msg.innerText = "Check! Opponent king (top) is in check";
    }
    document.body.appendChild(msg);
}

function hideCheckMessage() {
    const old = document.getElementById("checkMessage");
    if (old) old.remove();
}

function checkGameOver() {
    const side = turn === "enemy" ? "my" : "opponent";

    hideCheckMessage();
    const inCheck = isKingInCheck(side);

    if (hasAnyLegalMove(side)) {
        if (inCheck) {
            showCheckMessage(side);
        }
        return;
    }

    // no legal move is left
    clearSelection();
    if (inCheck) {
        // checkmate
        if (side === "my") {
            showGameOver("Checkmate! Opponent (top) wins");
        } else {
            showGameOver("Checkmate! You (bottom) win");
        }
    } else {
        showGameOver("Stalemate! Game is draw");
    }
    turn = "gameover";
}




// castling
function updateCastlingFlags() {
    const squares = board.querySelectorAll(".gridElement");

    if (!squares[60].querySelector(".king")) myKingMoved = true;
    if (!squares[56].querySelector(".rook")) myLeftRookMoved = true;
    if (!squares[63].querySelector(".rook")) myRightRookMoved = true;

    if (!squares[4].querySelector(".kingOp")) opKingMoved = true;
    if (!squares[0].querySelector(".rookOp")) opLeftRookMoved = true;
    if (!squares[7].querySelector(".rookOp")) opRightRookMoved = true;
}

function tryCastle(king, rook, rookFrom, rookTo, kingTo, emptySquares, safeSquares, attackingSide, nextTurn) {
    const squares = board.querySelectorAll(".gridElement");

    if (!rook) return;

    for (const index of emptySquares) {
        if (getPieceAt(index)) return;
    }

    for (const index of safeSquares) {
        if (isSquareAttacked(index, attackingSide)) return;
    }

    const marker = document.createElement("div");
    marker.className = "marker";
    squares[kingTo].appendChild(marker);

    squares[kingTo].onclick = (e) => {
        e.stopPropagation();

        squares[kingTo].appendChild(king);
        king.id = kingTo;

        squares[rookTo].appendChild(rook);
        rook.id = rookTo;

        clearSelection();
        turn = nextTurn;
    };
}

function addCastlingMoves(king, side) {
    const squares = board.querySelectorAll(".gridElement");

    if (side === "my") {
        if (myKingMoved) return;

        if (!myRightRookMoved) {
            tryCastle(king, squares[63].querySelector(".rook"), 63, 61, 62,
                [61, 62], [60, 61, 62], "opponent", "Ops");
        }
        if (!myLeftRookMoved) {
            tryCastle(king, squares[56].querySelector(".rook"), 56, 59, 58,
                [57, 58, 59], [60, 59, 58], "opponent", "Ops");
        }
    } else {
        if (opKingMoved) return;

        if (!opRightRookMoved) {
            tryCastle(king, squares[7].querySelector(".rookOp"), 7, 5, 6,
                [5, 6], [4, 5, 6], "my", "enemy");
        }
        if (!opLeftRookMoved) {
            tryCastle(king, squares[0].querySelector(".rookOp"), 0, 3, 2,
                [1, 2, 3], [4, 3, 2], "my", "enemy");
        }
    }
}

board.addEventListener("click", (e) => {
    const king = e.target.closest(".king, .kingOp");
    if (!king) return;

    if (king.classList.contains("king") && turn === "enemy") {
        addCastlingMoves(king, "my");
    } else if (king.classList.contains("kingOp") && turn === "Ops") {
        addCastlingMoves(king, "opponent");
    }
});

let lastTurn = turn;
setInterval(() => {
    if (turn !== lastTurn) {
        lastTurn = turn;
        if (turn === "gameover") return;
        updateCastlingFlags();
        checkGameOver();
    }
}, 200);

function removeIllegalMoves(piece, side) {
    const squares = board.querySelectorAll(".gridElement");

    squares.forEach((square) => {
        const pieceInSquare = square.querySelector(".pawn, .pawnOp");

        const isPossibleMove = square.onclick || (pieceInSquare && pieceInSquare.onclick);
        if (!isPossibleMove) return;
        if (pieceInSquare === piece) return;

        if (isMoveSafe(piece, square, side)) return;

        square.onclick = null;
        if (pieceInSquare) pieceInSquare.onclick = null;

        const marker = square.querySelector(".marker");
        if (marker) marker.remove();

        const danger = square.querySelector(".danger");
        if (danger) danger.classList.remove("danger");
    });
}

board.addEventListener("click", (e) => {
    const clicked = e.target.closest(".pawn, .pawnOp");
    if (!clicked) return;

    if (clicked.classList.contains("pawn") && turn === "enemy") {
        removeIllegalMoves(clicked, "my");
    } else if (clicked.classList.contains("pawnOp") && turn === "Ops") {
        removeIllegalMoves(clicked, "opponent");
    }
});

function startRevive(pawn, square, graveyard, pawnClass, message) {
    pawn.setAttribute("reachedEnd", "true");

    const choices = [];
    graveyard.querySelectorAll("." + pawnClass).forEach((piece) => {
        if (piece.className !== pawnClass) {
            choices.push(piece);
        }
    });

    if (choices.length === 0) return;

    const nextTurn = turn;
    turn = "gameover";

    const msg = document.createElement("div");
    msg.id = "reviveMessage";
    msg.style.cssText =
        "position:fixed;top:60px;left:50%;transform:translateX(-50%);" +
        "background:green;color:white;padding:10px 30px;font-size:22px;" +
        "border-radius:8px;z-index:9998;";
    msg.innerText = message;
    document.body.appendChild(msg);

    choices.forEach((piece) => {
        piece.style.outline = "3px solid gold";
        piece.style.cursor = "pointer";

        piece.onclick = () => {
            pawn.remove();
            square.appendChild(piece);
            piece.id = square.id;

            choices.forEach((item) => {
                item.style.outline = "";
                item.style.cursor = "";
                item.onclick = null;
            });

            msg.remove();
            turn = nextTurn;
        };
    });
}

function checkPawnReachedEnd() {
    if (turn === "gameover") return;

    const squares = board.querySelectorAll(".gridElement");

    for (let i = 0; i < 8; i++) {
        const pawn = squares[i].querySelector(".pawn");
        if (pawn && pawn.className === "pawn" && pawn.getAttribute("reachedEnd") !== "true") {
            startRevive(pawn, squares[i], FinshiedPawns, "pawn",
                "Your pawn reached the end! Click one of your eliminated pieces to revive it");
            return;
        }
    }

    for (let i = 56; i < 64; i++) {
        const pawnOp = squares[i].querySelector(".pawnOp");
        if (pawnOp && pawnOp.className === "pawnOp" && pawnOp.getAttribute("reachedEnd") !== "true") {
            startRevive(pawnOp, squares[i], OpsFinishedPawns, "pawnOp",
                "Opponent pawn reached the end! Click one of their eliminated pieces to revive it");
            return;
        }
    }
}

const pawnWatcher = new MutationObserver(() => {
    checkPawnReachedEnd();
});
pawnWatcher.observe(board, { childList: true, subtree: true });


console.log("My King:", isKingInCheck("my"));

console.log("Opponent King:", isKingInCheck("opponent"));
/*adding a load event listner*/
document.addEventListener("DOMContentLoaded", () => {
    makeRows(8);
    adjustingSoldiers()
})