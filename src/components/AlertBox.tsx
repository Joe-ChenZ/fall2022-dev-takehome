import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { render } from 'react-dom';
function AlertBox ({show, setShow} : {
    show: boolean,
    setShow: any,
}) {
    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Input Error!</Alert.Heading>
            <p>
                Both the todo title and due date need to be specified!
            </p>
        </Alert>
    )
};
export default AlertBox;