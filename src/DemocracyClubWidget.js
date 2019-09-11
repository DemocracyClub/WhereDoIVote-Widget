import React, { useState } from 'react';
import { EmbedCard } from './Branding';
import PostcodeSelector from './PostcodeSelector';

function DemocracyClubWidget() {
    let [searchInitiated, setSearchInitiated] = useState(false);

    return (
        <EmbedCard>
            {!searchInitiated && <PostcodeSelector setSearchInitiated={setSearchInitiated} />}

            {searchInitiated && (
                <>
                
                <button onClick={() => setSearchInitiated(false)}>Back to postcode search</button>
                </>
            )}
        </EmbedCard>
    );
}

export default DemocracyClubWidget;
