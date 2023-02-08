import React from 'react';
import Todo, { TodoInfo } from './Todo';

/**
 * TodoListコンポーネントのprops
 * @property {TodoInfo[]} todos - 登録されているTODO情報の配列
 * @property {Function} toggleTodo - TODOのチェック操作関数
 */
type Props = {
	todos: TodoInfo[];
	toggleTodo: (id: string) => void;
};

/**
 * TodoListコンポーネント
 * @param {TodoInfo[]} todos - 登録されているTODO情報の配列
 * @param {Function} toggleTodo - TODOのチェック操作関数
 * @returns TodoListコンポーネント
 */
const TodoList = ({todos, toggleTodo}: Props): JSX.Element => {
	return (
		<>
			{todos.map((todo: TodoInfo, index: number) => <Todo key={index} todo={todo} toggleTodo={toggleTodo} />)}
		</>
		);
}

export default TodoList;