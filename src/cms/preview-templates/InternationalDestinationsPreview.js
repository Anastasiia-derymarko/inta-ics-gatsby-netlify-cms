import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {InternationalDestinationsTemplate} from '../../templates/international-destinations';
import {DeliveryTemplate} from "../../templates/delivery";

const InternationalDestinationsPreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    const setting = {
        header: data.header || {},
        title: data.title,
        description: data.description || '',
        sections: data.sections || {},
        seoSections: data.seoSections || {}
    };

    if (data) {
        return (
            <Fragment>
                {data.header.buttons  ?
                        <DeliveryTemplate
                            sectionText={data.sectionText}
                            {...setting}
                        />
                        :
                        <InternationalDestinationsTemplate
                            {...setting}
                        />
                }
            </Fragment>
        )
    } else {
        return <div>Loading...</div>
    }
};

InternationalDestinationsPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default InternationalDestinationsPreview
