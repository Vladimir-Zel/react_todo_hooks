import React from 'react';
import styles from './header.module.css'
import {Col, Row} from "react-bootstrap";

const Header = () => {
    return (
        <Row>
            <Col>
                <div className={styles.root}>Todo list</div>
            </Col>
        </Row>
    );
};

export default Header;