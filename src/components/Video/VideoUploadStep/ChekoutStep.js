import React from 'react';
import '../step.scss';
export default function CheckoutSteps(props) {
  return (
    <div className='ro checkout-steps'>
      <div className={props.step1 ? 'active' : ''}>Sign in</div>
      <div className={props.step2 ? 'active' : ''}>Shipping</div>
      <div className={props.step3 ? 'active' : ''}>Payment</div>
      <div className={props.step4 ? 'active' : ''}>UPgread to Premium</div>
    </div>
  );
}
