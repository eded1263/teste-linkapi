import pipedrive from "pipedrive";

pipedrive.Configuration.apiToken = process.env.PIPEDRIVE_KEY;

export default { pipedriveonnection: pipedrive };
