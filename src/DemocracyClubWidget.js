import React, { useState } from 'react';
import { EmbedCard, StartAgainButton } from './Branding';
import PostcodeSelector from './PostcodeSelector';

function DemocracyClubWidget() {
    let [searchInitiated, setSearchInitiated] = useState(false);

    return (
        <EmbedCard className="DemocracyClubWidget">
            {!searchInitiated && <PostcodeSelector setSearchInitiated={setSearchInitiated} />}

            {searchInitiated && <StartAgainButton onClick={() => setSearchInitiated(false)}/>}
        </EmbedCard>
    );
}

export default DemocracyClubWidget;
