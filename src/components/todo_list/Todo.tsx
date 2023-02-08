import React from 'react';

/**
 * TODO情報
 */
export class TodoInfo {
	/**
	 * @constructor
	 * @param {string} id - ID
	 * @param {string} name - TODO名
	 */
	constructor (id: string, name: string) {
		this.id = id;
		this.name = name;
		this.isCompleted = false;
	}

	/**
	 * ID
	 */
	public id: string;
	/**
	 * TODO名
	 */
	public name: string;
	/**
	 * 完了フラグ
	 */
	public isCompleted: boolean;
}

/**
 * Todoコンポーネントのprops
 * @property {number} key - リストのインデックス
 * @property {TodoInfo} todo - 登録されているTODO
 * @property {Function} toggleTodo - TODOのチェック操作関数
 */
type Props = {
	key: number;
	todo: TodoInfo;
	toggleTodo: (id: string) => void;
};

/**
 * Todoコンポーネント
 * @param {string} todo - 登録されているTODO
 * @param {Function} toggleTodo - TODOのチェック操作関数
 * @returns Todoコンポーネント
 */
const Todo = ({todo, toggleTodo}: Props): JSX.Element => {
	/**
	 * チェックボックス操作イベント
	 */
	const handleTodoClick = (): void => {
		toggleTodo(todo.id);
	}

	return (
		<div id={todo.id}>
			<label>
				<input type="checkbox" checked={todo.isCompleted} onChange={handleTodoClick} readOnly />
			</label>
			{todo.name}
		</div>
	);
}

export default Todo;