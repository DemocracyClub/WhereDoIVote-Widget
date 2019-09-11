import React, { useState } from 'react';
import { EmbedCard, StartAgainButton, ErrorMessage, BuiltByDC } from './Branding';
import PostcodeSelector from './PostcodeSelector';
import * as axios from 'axios'
import API from './api/DemocracyClubAPIHandler';

function DemocracyClubWidget() {
    const api = new API(axios);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [postcodeData, setPostcodeData] = useState(false);
    const [currentError, setCurrentError] = useState(undefined);

    return (
        <EmbedCard className="DemocracyClubWidget">
            {currentError && (
                <ErrorMessage
                    currentError={currentError}
                    clearError={() => setCurrentError(false)}
                />
            )}
            {!searchInitiated && (
                <PostcodeSelector
                    api={api}
                    setSearchInitiated={setSearchInitiated}
                    setCurrentError={setCurrentError}
                    setPostcodeData={setPostcodeData}
                />
            )}
            {postcodeData && searchInitiated && <h1>Got data</h1>}
            {searchInitiated && <StartAgainButton onClick={() => setSearchInitiated(false)} />}
            <BuiltByDC />
        </EmbedCard>
    );
}

export default DemocracyClubWidget;
