/**
 * P2P-Bomberman game manager class.
 * Handles overall game management.
 *
 * Author: Markus Konrad <post@mkonrad.net>
 */

/**
 * Define game types.
 */
var GameModeSinglePlayer 	= 0;
var GameModeMultiPlayer 	= 1;

/**
 * Game class contructor. Create a new game with game mode <mode> of type GameMode*.
 */
function GameClass(mode) {
    this._view 			= null;	// ViewClass object
    this._map 			= null;	// MapClass object
    this._controls 		= null;	// ControlsClass object
    this._playerManager = null;	// PlayerManagerClass object

	this._mode = mode;	// game mode
}

/**
 * Set up a new game.
 */
GameClass.prototype.setup = function() {
	// create all objects
    this._view 			= new ViewClass();
    this._map 			= new MapClass();
    this._controls 		= new Array();
    this._playerManager = new PlayerManagerClass();

    // set up the view and the map
    this._view.setup(MapDimensions.w, MapDimensions.h);
    this._map.setup(this._view);

    // set up the player manager
    this._playerManager.setup(this._map);
}

/**
 * Start a new game.
 */
GameClass.prototype.startGame = function() {
	// add the map as background entity
	this._view.addEntity(this._map);

	// initialize game in single player mode
	if (this._mode === GameModeSinglePlayer) {
		// init local player 1
		var player1 = new PlayerClass(PlayerTypeLocalKeyboardArrows);
		player1.setup(this._view, this._playerManager);
		this._view.addEntity(player1);
		this._playerManager.addPlayer(player1);

		// set player1 controls to arrow keys
		var player1Controls = new ControlsClass();
		player1Controls.setup(player1, new Array(
			'left', 'right',
			'up', 'down',
			'b'
		));
		this._controls.push(player1Controls);

		// init local player 2
		var player2 = new PlayerClass(PlayerTypeLocalKeyboardWSAD);
		player2.setup(this._view, this._playerManager);
		this._view.addEntity(player2);
		this._playerManager.addPlayer(player2);

		// set player2 controls to WSAD
		var player2Controls = new ControlsClass();
		player2Controls.setup(player2, new Array(
			'a', 'd',
			'w', 's',
			'x'
		));
		this._controls.push(player2Controls);
	}
    
    // spawn all players
    this._playerManager.spawnAllPlayers();

    // start draw update
	this.frame();
}

/**
 * Stop the game.
 */
GameClass.prototype.stopGame = function() {

}

/**
 * Game round ended.
 */
GameClass.prototype.roundEnded = function() {
	console.log('round ended');
}

/**
 * Draw view update.
 */
GameClass.prototype.frame = function() {
    this._view.update();

    // request new frame
    requestAnimFrame(function() {
        this.frame();
    }.bind(this));
}


