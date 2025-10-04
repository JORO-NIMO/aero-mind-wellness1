// import React from 'react';
// import { Container } from "@/components/ui/container";
// import { Typography } from "@/components/ui/typography";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/components/ui/link";
// import { Grid } from "@/components/ui/grid";

// const Resources = () => {
//   const resources = {
//     emergencyHelp: [
//       {
//         name: "National Suicide Prevention Lifeline",
//         description: "24/7 free and confidential support",
//         contact: "988",
//         website: "https://988lifeline.org/"
//       },
//       {
//         name: "Crisis Text Line",
//         description: "24/7 crisis support via text",
//         contact: "Text HOME to 741741",
//         website: "https://www.crisistextline.org/"
//       }
//     ],
//     onlineResources: [
//       {
//         name: "NIMH",
//         description: "National Institute of Mental Health - Educational resources",
//         website: "https://www.nimh.nih.gov/"
//       },
//       {
//         name: "Mental Health America",
//         description: "Mental health resources and online screening tools",
//         website: "https://www.mhanational.org/"
//       }
//     ],
//     apps: [
//       {
//         name: "Headspace",
//         description: "Meditation and mindfulness app",
//         website: "https://www.headspace.com/"
//       },
//       {
//         name: "Calm",
//         description: "Sleep, meditation and relaxation app",
//         website: "https://www.calm.com/"
//       }
//     ]
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h3" component="h1" gutterBottom>
//         Mental Health Resources
//       </Typography>

//       <Typography variant="body1" paragraph>
//         Find helpful mental health resources, crisis support, and wellness tools below.
//       </Typography>

//       <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
//         Emergency Help
//       </Typography>
//       <Grid container spacing={3}>
//         {resources.emergencyHelp.map((resource, index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{resource.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {resource.description}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                   Contact: {resource.contact}
//                 </Typography>
//                 <Link href={resource.website} target="_blank" rel="noopener">
//                   Visit Website
//                 </Link>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
//         Online Resources
//       </Typography>
//       <Grid container spacing={3}>
//         {resources.onlineResources.map((resource, index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{resource.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {resource.description}
//                 </Typography>
//                 <Link href={resource.website} target="_blank" rel="noopener">
//                   Visit Website
//                 </Link>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
//         Recommended Apps
//       </Typography>
//       <Grid container spacing={3}>
//         {resources.apps.map((resource, index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{resource.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {resource.description}
//                 </Typography>
//                 <Link href={resource.website} target="_blank" rel="noopener">
//                   Visit Website
//                 </Link>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Resources;