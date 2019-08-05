const validateDependencyApiUrls = () =>{
  const missingTargets = [];

  if(!process.env.SENDER_API_URL) missingTargets.push('SENDER_API_URL');

  if(missingTargets.length > 0){
    const str =  `The following required environment variable are missing: ${JSON.stringify(missingTargets)}. Server shutting down at ${new Date()}.`;
    throw new Error(str);
  }
};
const getDependencyApiUrl = (TARGET_ENUM) => {
  switch (TARGET_ENUM) {
    case 'SENDER':
      return process.env.SENDER_API_URL;
  }
}

const getDependencies = ()=>{
  return ['SENDER'];
};


module.exports = {validateDependencyApiUrls, getDependencyApiUrl, getDependencies};
