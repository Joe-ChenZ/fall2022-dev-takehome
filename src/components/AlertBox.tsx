import Alert from 'react-bootstrap/Alert';
function AlertBox ({show, setShow} : {
    show: boolean,
    setShow: (show: boolean) => void,
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