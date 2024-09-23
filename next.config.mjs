import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontEndNav:true,
    aggressiveFrontEndNavCaching:true,
    reloadOnOnline:true,
    swcMinfy:true,
    disable:false,
    workboxOptions:{
    disableDevLogs:true
    }
  });
  
export default withPWA({
  });  


