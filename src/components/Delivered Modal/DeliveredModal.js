import React from 'react';
import ReactDOM from 'react-dom';
import './DeliveredModal.css';
// import { useState, useEffect } from 'react';

const DeliveredModal = ({ open, onClose, id, accept }) => {

    if (!open) return null;

    const orderDelivered = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'delivered',
            })
        };
        let idOrder = 'http://localhost:3333/orders/' + id;
        console.log(idOrder);

        fetch(idOrder, requestOptions)
            .then(response => response.json())
            .then(onClose)
            .then(accept)
            .catch(res => console.log(res))
    }

    return ReactDOM.createPortal(
        <>
            <div className='wrapper'>
                <div className='modal-error'>
                    <button className="close-modal" onClick={onClose}> X </button>
                    <p className='txt-message'>Was the order successfully delivered? :)</p>
                    <button className="order-delivered" onClick={() => { orderDelivered() }} > Yes </button>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
}

export default DeliveredModal;