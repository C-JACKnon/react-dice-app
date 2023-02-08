import React, { useState } from 'react';
import './App.css';
import { DiceMinValue, DiceDefaultMaxValue, DiceValueHistoryNumber } from './constants/diceSetting';
import DiceHistory from './components/dice_history/DiceHistory';
import DiceMaxValueSetting from './components/dice_max_value_setting/DiceMaxValueSetting';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

/**
 * アプリケーションコンポーネント
 * @returns アプリケーションコンポーネント
 */
function App() {
  // 表示するサイコロの目
  const [diceValue, setDiceValue] = useState<number>(DiceDefaultMaxValue);

  // 表示したサイコロの目の履歴
  const [diceValueHistory, setDiceValueHistory] = useState<number[]>([]);

  // サイコロの最大値
  const [diceMaxValue, setDiceMaxValue] = useState<number>(DiceDefaultMaxValue);

  /**
   * STARTボタン押下イベント
   */
  const handleCreateRandomNumber = (): void => {
    // サイコロの目の履歴をコピー
    const newDiceValueHistory = [...diceValueHistory];

    // 前回のサイコロの目を履歴に追加(先頭に追加)
    newDiceValueHistory.unshift(diceValue);

    // 履歴の数が表示させる個数を超えていた場合
    if (newDiceValueHistory.length > DiceValueHistoryNumber) {
      // 6回前のサイコロの目を履歴から削除(配列の最後を削除)
      newDiceValueHistory.pop();
    }

    // 乱数生成
    const newRandomNumber = createRandomNumber(DiceMinValue, diceMaxValue);

    // 反映
    setDiceValue(newRandomNumber);
    setDiceValueHistory(newDiceValueHistory);
  }

  /**
   * 乱数生成する
   * @param {number} min - 最小値
   * @param {number} max - 最大値
   * @returns ランダムに生成した整数
   */
  const createRandomNumber = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * サイコロの最大値を変更する
   * @param {boolean} isIncrement - true: +1, false: -1
   */
  const changeDiceMaxValue = (isIncrement: boolean): void => {
    // 最小値判定
    if (diceMaxValue === DiceMinValue && !isIncrement) {
      return;
    }

    const newDiceMaxValue = isIncrement? diceMaxValue + 1: diceMaxValue - 1;
    
    // 反映
    setDiceMaxValue(newDiceMaxValue);
  }

  return (
    <div id="app-container">
      <Card sx={{ minWidth: 500 }} id="app-card">
        <CardContent>
          <div id="app-components">
            <DiceMaxValueSetting diceMaxValue={diceMaxValue} changeDiceMaxValue={changeDiceMaxValue}></DiceMaxValueSetting>
            <DiceHistory diceValueHistory={diceValueHistory}></DiceHistory>
            <div id="dice-value">
              {diceValue}
            </div>
            <Button variant="contained" onClick={handleCreateRandomNumber}>START</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );


  // // 登録したTODOの状態変数を生成
  // const [todos, setTodos] = useState<TodoInfo[]>([]);

  // // 入力されたTODO名の要素の参照変数を生成
  // const todoNameRef = useRef<HTMLInputElement | null>(null);

  // /**
  //  * タスク追加ボタンクリックイベント
  //  */
  // const handleAddTodo = (): void => {
  //   // タスク名の取得
  //   const inputName = (todoNameRef.current as HTMLInputElement).value;
    
  //   // タスク名が入力されているか判定
  //   if (inputName == "" || inputName == undefined || inputName == null) {
  //     return;
  //   }

  //   // タスクの追加
  //   setTodos((prevTodos: TodoInfo[]) => {
  //     return [...prevTodos, new TodoInfo(uuidv4(), inputName as string)]
  //   });

  //   // 入力されているタスク名の削除
  //   (todoNameRef.current as HTMLInputElement).value = "";
  // }

  // /**
  //  * TODOのチェック操作
  //  * @param {string} id - チェック操作するTODOのID
  //  */
  // const toggleTodo = (id: string): void => {
  //   // Todoリストをコピー
  //   const newTodos = [...todos];

  //   // 操作したTODO情報をIDで探索
  //   const todo = newTodos.find((todo) => todo.id === id);

  //   // TODOがID探索で見つからなかった場合
  //   if (todo === undefined) {
  //     return;
  //   }

  //   // チェックを反転させる
  //   todo.isCompleted = !todo.isCompleted;

  //   // 変更の反映
  //   setTodos(newTodos);
  // }

  // /**
  //  * 完了したTODOの削除
  //  */
  // const handleRemoveCompletedTodo = () => {
  //   // 完了していないTodoリストのコピー
  //   const newTodos = todos.filter((todo) => !todo.isCompleted);
    
  //   // 変更の反映
  //   setTodos(newTodos);
  // }

  // return (
  //   <>
  //     <TodoList todos={todos} toggleTodo={toggleTodo} />
  //     <input type="text" ref={todoNameRef} />
  //     <button onClick={handleAddTodo}>タスクの追加</button>
  //     <button onClick={handleRemoveCompletedTodo}>完了したタスクの削除</button>
  //     <div>残りのタスク: {todos.filter((todo) => !todo.isCompleted).length}</div>
  //     <Button variant="contained">Hello World</Button>
  //   </>
  // );
}

export default App;
