const validateDependencyApiUrls = () =>{
  const missingTargets = [];

  if(!process.env.FORTUNE_API_URL) missingTargets.push('FORTUNE_API_URL');

  if(missingTargets.length > 0){
    const str =  `The following required environment variable are missing: ${JSON.stringify(missingTargets)}. Server shutting down at ${new Date()}.`;
    throw new Error(str);
  }
};
const getDependencyApiUrl = (TARGET_ENUM) => {
  switch (TARGET_ENUM) {
    case 'FORTUNE':
      return process.env.FORTUNE_API_URL;
  }
}

const getDependencies = ()=>{
  return ['SENDER, FORTUNE'];
};


module.exports = {validateDependencyApiUrls, getDependencyApiUrl, getDependencies};
