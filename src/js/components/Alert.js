import React from 'react';
import {connect} from "react-redux";
import {hideAlert} from "../redux/actions";

function Alert({alertText, hideAlert}) {

    return (
        <div className='alert'>
            <div onClick={hideAlert} className='alert__hide-btn cancel-btn' />
            <span className='alert__text'>{alertText}</span>
        </div>
    )
}

const mapStateToProps = state => ({
    alertText: state.app.alertText
});

const mapDispatchToProps = {
    hideAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);