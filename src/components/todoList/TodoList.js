import React, {useEffect, useState} from 'react';
import styles from './todoList.module.css';
import {Button, ButtonGroup} from "react-bootstrap";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faLock, faLockOpen, faSave, faTrash} from '@fortawesome/free-solid-svg-icons'

const TodoList = ({todo, setTodo}) => {

    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState('');
    const [filtered, setFiltered] = useState(todo);

    useEffect(() => {
        setFiltered(todo)
    }, [todo]);

    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id !== id)
        setTodo(newTodo)
    }

    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    }

    function editTodo(id, title) {
        setEdit(id)
        setValue(title)
    }

    function saveTodo(id) {
        let newTodo = [...todo].map(item => {
            if (item.id === id) {
                item.title = value
                setEdit(null)
            }
            return item
        })
        setTodo(newTodo)
    }

    function todoFilter(status) {
        if (status === 'all') {
            setFiltered(todo)
        } else {
            let newTodo = [...todo].filter(item => item.status === status)
            setFiltered(newTodo)
        }
    }

    return (
        <>
            <div className={styles.filter}>
                <ButtonGroup>
                    <Button variant='secondary' size='sm' onClick={() => todoFilter('all')}> All todos</Button>
                    <Button variant='secondary' size='sm' className={'mx-1'} onClick={() => todoFilter(true)}>Opened todos </Button>
                    <Button variant='secondary' size='sm' onClick={() => todoFilter(false)}>Closed todos</Button>
                </ButtonGroup>
            </div>

            {
                filtered.map(item => (
                    <div key={item.id} className={styles.listItems}>
                        {
                            edit === item.id ?
                                <div>
                                    <input onChange={(e) => setValue(e.target.value)} value={value}/>
                                </div> :
                                <div className={!item.status ? styles.close : ''}>{item.title}</div>
                        }

                        {
                            edit === item.id ?
                                <div>
                                    <Button className={styles.btn} size={"sm"} variant='outline-info'
                                            onClick={() => saveTodo(item.id)}> <FontAwesomeIcon
                                        icon={faSave}/> </Button>
                                </div> :
                                <div>
                                    <Button className={styles.btn} size={"sm"} variant='outline-dark'
                                            onClick={() => editTodo(item.id, item.title)}><FontAwesomeIcon
                                        icon={faEdit}/></Button>

                                    <Button className={styles.btn} size={"sm"} variant='outline-dark'
                                            onClick={() => statusTodo(item.id)}> {
                                        item.status ? <FontAwesomeIcon icon={faLockOpen}/> :
                                            <FontAwesomeIcon icon={faLock}/>
                                    }
                                    </Button>

                                    <Button className={styles.btn} size={"sm"} variant='outline-danger'
                                            onClick={() => deleteTodo(item.id)}> <FontAwesomeIcon
                                        icon={faTrash}/></Button>
                                </div>
                        }
                    </div>
                ))
            }
        </>
    );
};

export default TodoList;