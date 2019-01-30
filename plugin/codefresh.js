const request = require('request-promise');

class Codefresh {
    /**
     *
     * @return {{buildTrigger: *, buildInitiator: *, buildId: *, buildTimestamp: *, buildUrl: *, repoOwner: *, repoName: *, branch: *, revision: *, commitAuthor: *, commitUrl: *, commitMessage: *, apiKey: *}}
     */
    static get info() {
        return {
            buildTrigger: process.env.CF_BUILD_TRIGGER,
            buildInitiator: process.env.CF_BUILD_INITIATOR,
            buildId: process.env.CF_BUILD_ID,
            buildTimestamp: process.env.CF_BUILD_TIMESTAMP,
            buildUrl: process.env.CF_BUILD_URL,
            repoOwner: process.env.CF_REPO_OWNER,
            repoName: process.env.CF_REPO_NAME,
            branch: process.env.CF_BRANCH_TAG_NORMALIZED,
            revision: process.env.CF_REVISION,
            commitAuthor: process.env.CF_COMMIT_AUTHOR,
            commitUrl: process.env.CF_COMMIT_URL,
            commitMessage: process.env.CF_COMMIT_MESSAGE,
            apiKey: process.env.CF_API_KEY,
        };
    }

    static async buildStatus(buildId, token) {
        const data = await request({
            uri: `https://g.codefresh.io/api/workflow/${buildId}/context-revision`,
            method: 'GET',
            headers: {
                'x-access-token': token,
            },
            json: true,
        });

        // console.log(Object.entries(data.pop().context.stepsMetadata).map(item => item[1].status));

        return Object.entries(data.pop().context.stepsMetadata)
            .every(item => item[1].status !== 'failure');
    }
}

module.exports = Codefresh;
