import React, {useState} from 'react';
import {v4 as uuid4} from 'uuid';
import {Button, Col, FormControl, Row} from "react-bootstrap";
import styles from './addTodo.module.css'

const AddTodo = ({todo, setTodo}) => {

    const [value, setValue] = useState('');

    function saveTodo() {
        if (value) {
            setTodo(
                [...todo, {
                    id: uuid4(),
                    title: value,
                    status: true
                }]
            )
            setValue('')
        }
    }

    return (
        <Row className='mt-4'>
            <Col className={styles.addTodoForm}>
                <FormControl placeholder='enter todo...' value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button className={styles.btn} size={"sm"} variant='outline-success' onClick={saveTodo}> add Todo </Button>
            </Col>
        </Row>
    );
};

export default AddTodo;