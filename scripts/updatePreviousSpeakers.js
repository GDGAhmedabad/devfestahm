const fs = require('fs');
const path = require('path'); // Require the path module

// Resolve the file path relative to the script location
const filePath = path.resolve(__dirname, '../public/data/firestore-data.json');

const data = require(filePath);

const speakers = data.speakers;
const sessions = data.sessions;

const year = 2023;

Object.keys(speakers).forEach((speaker, index) => {
    data['previousSpeakers'][speaker] = {
        bio: speakers[speaker].bio,
        company: speakers[speaker].company,
        companyLogo: speakers[speaker].companyLogoUrl,
        country: speakers[speaker].country,
        id: speaker,
        name: speakers[speaker].name,
        order: index,
        photoUrl: speakers[speaker].photoUrl,
        sessions: data['previousSpeakers'][speaker]?.sessions || {},
        socials: speakers[speaker].socials,
        title: speakers[speaker].title,
    };

    Object.keys(sessions).forEach((sessionId) => {
        const session = sessions[sessionId];

        if (session.speakers && session.speakers.includes(speaker)) {
            if (!data['previousSpeakers'][speaker].sessions[year]) {
                data['previousSpeakers'][speaker].sessions[year] = [];
            }

            data['previousSpeakers'][speaker].sessions[year].push({
                presentation: session.presentation,
                tags: session.tags,
                title: session.title,
                videoId: session.videoId
            });
        }
    });
});

// Uncomment if you want to remove speakers not in data.speakers
// Object.keys(data['previousSpeakers']).forEach((previousSpeaker) => {
//     if (!speakers[previousSpeaker]) {
//         delete data['previousSpeakers'][previousSpeaker];
//     }
// });

// Write updated data back to the JSON file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

console.log('Previous speakers updated with session data successfully!');
