var config = Meteor.settings;

// github login
if (config.Github_AK && config.Github_SK){
  console.log('Config github ...');
  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        clientId: config.Github_AK,
        loginStyle: 'popup',
        secret: config.Github_SK,
      }
    }
  );
}

// kadira monitor
if (config.Kadira_AK && config.Kadira_SK) {
  console.log('Config kadira ...');
  Kadira.connect(config.Kadira_AK, config.Kadira_SK);
}
