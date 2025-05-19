import { Box, Text } from 'grommet';

export const AboutUs = () => (
  <Box pad="large" align="center" margin={{ top: 'large' }} gap="medium">
    <Text size="xxlarge" color="white" weight="bold" margin={{ bottom: 'small' }}>
      About the Project
    </Text>
    <Text color="white" size="large" style={{ maxWidth: 700 }}>
      This project focuses on the development of a script designed to integrate with SCORM courses and significantly expand user interaction tracking capabilities.
      <br /><br />
      While traditional SCORM standards allow the recording of basic data such as progress and scores, our script captures detailed user events, such as clicks and scroll movements within the course content. This information is efficiently stored in the database (Kafka) using standard SCORM channels, ensuring compatibility and ease of integration.
      <br /><br />
      The analysis of this data enables the extraction of accurate and valuable statistics on how students interact with courses, facilitating informed decision-making to improve the design, usability, and effectiveness of future educational content.
      <br /><br />
      Aware of the technical storage limitations in SCORM, our approach includes techniques to optimize and compress the collected information, ensuring optimal performance without compromising tracking quality.
      <br /><br />
      In summary, the <Text color="coral" size="large">scorm-worker.js</Text> script represents a significant advancement in tracking and analyzing the digital learning experience, providing developers and educators with tools to create more tailored and effective courses.
    </Text>
  </Box>
);
