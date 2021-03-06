import React from 'react'
import PropTypes from 'prop-types'
import { ComponentsCommonTemplate } from '../../pages/components'

const ComponentsCommonPreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();

    if (data) {
        return (
            <ComponentsCommonTemplate
                mainPopup={data.mainPopup}
                calculateHeader={data.calculateHeader}
                calculator={data.calculator}
                storage={data.storage}
                destinations={data.destinations}
                reviews={data.reviews}
                clients={data.clients}
                popupThanks={data.popupThanks}
            />
        )
    } else {
        return <div>Loading...</div>
    }
};

ComponentsCommonPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default ComponentsCommonPreview
