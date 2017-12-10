import * as VueRouter from "vue-router";
import * as Vue from "vue";
import * as ExtraVue from "ExtraVue";
import * as t1 from "t1";

Vue.use(VueRouter);

let appTemplate = `
<div>
	<span>井字遊戲</span>
	<br/>
	<button @click="startNewGame()">開始新遊戲</button>
	<br />
	<table class="table table-bordered TicTac" style="width:100px">
		<tbody>
			<tr v-for="x in 3">
				<template v-for="y in 3">
					<td @click="clickPlaid(x-1,y-1)">{{ ticMatrix[x-1][y-1] }}</td>
				</template>
			</tr>
		</tbody>
   </table>
	<span>{{ $store.state.message }}</span>
</div>
`;

const OPlayerName: string = "O 玩家";
const XPlayerName: string = "X 玩家";
const NonePlayerName: string = "None 玩家";

enum DrawType {
	None,
	Circle,
	Fork
}

class Player {
	type: DrawType;
	name: string;

	public static create(playerName: string, drawType: DrawType): Player {
		let player = new Player();
		player.type = drawType;
		player.name = playerName;
		return player;
	}
}

enum GameActionType {
	StartNewGame,
	ClickPlaid
}

class Position {
	x: number;
	y: number;
}

function Pos(x: number, y: number): Position {
	let pos = new Position();
	pos.x = x;
	pos.y = y;
	return pos;
}

const PlaidDicTuples: t1.IDictionaryTuple<DrawType, string>[] = [
	[DrawType.None, " "],
	[DrawType.Fork, "X"],
	[DrawType.Circle, "O"]
];
const PlaidDic = t1.createDictionaryTable<DrawType, string>(PlaidDicTuples);

class MyApp extends ExtraVue.VueApp {

	constructor() {
		super();

	}

	getTemplate(): string {
		return appTemplate;
	}

	@ExtraVue.VueMethod()
	startNewGame() {
		this.action(GameActionType[GameActionType.StartNewGame]);
	}

	@ExtraVue.VueMethod()
	clickPlaid(x: number, y: number) {
		this.action(GameActionType[GameActionType.ClickPlaid], Pos(x, y));
	}

	@ExtraVue.VueComputed()
	ticMatrix(): string[][] {
		let state = this.storeState as MyState;
		console.log("ticMatrix() VueComputed", state.ticMatrix);
		let result: string[][] = [];
		for (let x = 0; x < 3; x++) {
			result[x] = [];
			for (let y = 0; y < 3; y++) {
				result[x][y] = PlaidDic[state.ticMatrix[x][y].type];
			}
		}
		return result;
	}
}

const EmptyPlayer = Player.create(NonePlayerName, DrawType.None);

function createEmptyTicMatrix(): Player[][] {
	let data: Player[][] = [];
	for (let x = 0; x < 3; x++) {
		data[x] = [];
		for (let y = 0; y < 3; y++) {
			data[x][y] = EmptyPlayer;
		}
	}
	return data;
}

class MyState {
	ticMatrix: Player[][] = createEmptyTicMatrix();
	message: string = "";
	isGameOver: boolean = false;
}

class TicMatrix {
	ticMatrixData: Player[][];

	constructor(ticMatrixData: Player[][]) {
		this.ticMatrixData = ticMatrixData;
	}

	getPlayer(pos: Position): Player {
		return this.ticMatrixData[pos.x][pos.y];
	}

	isLineSame(line: Position[]): boolean {
		let item: Player = this.getPlayer(line[0]);
		for (let idx = 1; idx < line.length; idx++) {
			var next = this.getPlayer(line[idx]);
			if (item.type !== next.type) return false;
		}
		if (item.type === EmptyPlayer.type) return false;
		return true;
	}

	isAvailable(): boolean {
		let noneCount = 0;
		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				if (this.ticMatrixData[x][y].type === EmptyPlayer.type) {
					noneCount++;
				}
			}
		}
		return noneCount > 0;
	}

	isPlayer(pos: Position, p: Player): boolean {
		return (this.ticMatrixData[pos.x][pos.y].type === p.type);
	}

	replace(pos: Position, val: Player) {
		let items = this.ticMatrixData[pos.x];
		items.splice(pos.y, 1, val);
	}
}

class MyVuexStore extends ExtraVue.VuexStore {
	players: Player[] = [];
	playerIndex: number = 0;

	constructor(initState: MyState) {
		super(initState);
		this.createPlayers();
	}

	protected createPlayers(): void {
		let player = Player.create(OPlayerName, DrawType.Circle);
		this.players.push(player);

		player = Player.create(XPlayerName, DrawType.Fork);
		this.players.push(player);
	}

	@ExtraVue.VuexActionMutation(GameActionType[GameActionType.StartNewGame])
	startNewGame(commit) {
		let self = this;
		this.playerIndex = 0;
		commit((state: MyState) => {
			Object.assign(self._vueObj.state, new MyState());
			state.message = "新遊戲";
			state.isGameOver = false;
			console.log("startNewGame");
		});
	}

	@ExtraVue.VuexActionMutation(GameActionType[GameActionType.ClickPlaid])
	clickPlaid(commit, pos: Position) {
		console.log("clickPlaid", pos.x, pos.y);
		let self = this;

		commit((state: MyState) => {
			console.log("clickPlaid commit before", state);

			if (state.isGameOver) {
				console.log("clickPlaid", "gameOver");
				return;
			}

			let ticMatrix = new TicMatrix(state.ticMatrix);
			if (ticMatrix.isPlayer(pos, EmptyPlayer)) {
				let player = self.getCurrentPlayer();
				ticMatrix.replace(pos, player);
				player = self.nextPlayer();
				state.message = `換 ${player.name} 下手`;
				self.checkGameResult(state);
			}
		});
	}

	_winGroup: Position[][] = [
		[Pos(0, 0), Pos(0, 1), Pos(0, 2)],
		[Pos(1, 0), Pos(1, 1), Pos(1, 2)],
		[Pos(2, 0), Pos(2, 1), Pos(2, 2)],
		[Pos(0, 0), Pos(1, 0), Pos(2, 0)],
		[Pos(0, 1), Pos(1, 1), Pos(2, 1)],
		[Pos(0, 2), Pos(1, 2), Pos(2, 2)],
		[Pos(0, 0), Pos(1, 1), Pos(2, 2)],
		[Pos(0, 2), Pos(1, 1), Pos(2, 0)]
	];

	protected checkGameResult(state: MyState): void {
		let ticMatrix = new TicMatrix(state.ticMatrix);

		for (let i = 0; i < this._winGroup.length; i++) {
			let posLine = this._winGroup[i];

			var a = ticMatrix.getPlayer(posLine[0]);

			if (ticMatrix.isLineSame(posLine)) {
				state.message = `${a.name} 勝利`;
				state.isGameOver = true;
				console.log(this.state, "勝利");
				return;
			}
		}

		if (!ticMatrix.isAvailable()) {
			state.message = "平手";
		}
	}

	protected getCurrentPlayer(): Player {
		return this.players[this.playerIndex];
	}

	protected nextPlayer(): Player {
		this.playerIndex = this.playerIndex === 0 ? 1 : 0;
		return this.players[this.playerIndex];
	}
}

let store = ExtraVue.VuexStore.create(MyVuexStore, new MyState());

export let app = ExtraVue.VueApp.create(MyApp, "#app", { store });