/* ═══════════════════════════════════════════════════════════════════════════
   ✏️  CONTENT.JS — THE ONLY FILE YOU EDIT.
   Every word, project, blog post and photo on the site comes from here.

   QUICK RULES
   • Text goes between the ` backtick marks. Apostrophes ( ' ) are fine inside.
   • Every { ... } block ends with a comma:  },
   • Photos: upload them to the "images" folder on GitHub, then write the
     name here, e.g.  cover: `images/gripper.jpg`  (names are case-sensitive).
     Leave it as  ``  to show a grid placeholder instead.

   WRITING INSIDE THE LONG TEXT FIELDS (objective, overview, results, body…)
   • Leave an empty line between paragraphs.
   • Start a line with "- " to make a bullet point.
   • Start a line with "## " to make a small subheading.
   • **two stars** around words makes them bold.
   • [link text](https://example.com) makes a link.
   • To place a picture inside the text, put this on its own line:
       [image: images/your-photo.jpg | right | Caption under the photo]
     The middle part can be  right,  left  or  full  (full width).
   ═══════════════════════════════════════════════════════════════════════════ */

const SITE = {
  name: `Minsuh (Ben) Cho`,
  email: `mscho40905@gmail.com`,
  linkedin: `https://www.linkedin.com/in/bencho0905`,
  resume: `resume.pdf`,          // the résumé PDF in the main folder
  portrait: ``,                  // e.g. images/ben.jpg
};


/* ───────────────────────────────────────────────────────────────────────────
   PROJECTS
   The two projects with  major: true  show as the large cards on top.
   All others show below, three per row, in the order listed here.

   type decides which headings the project page shows:
     `personal` → Objective · Design requirements · Overview · Results
     `team`     → Objective · My role · Overview · Results
     `research` → My role · Objective · Overview of my contribution · Results
                  (plus Lab / institution and Timeline at the top)
   You can leave fields you don't need for that type empty, or delete them.

   id is the project's web address: project.html?id=parallel-gripper
   Use lowercase letters and dashes only, and never reuse an id.
   ─────────────────────────────────────────────────────────────────────────── */

const PROJECTS = [

  {
    id: `parallel-gripper`,
    type: `team`,
    major: true,
    title: `Parallel Robotic Gripper`,
    context: `JHU Mars Rover Team`,          // club, course, or lab shown on the card
    date: `Mar – Aug 2025`,
    status: ``,                               // optional small tag, e.g. `In progress` or `2nd of 22`
    cover: ``,                                // main photo for the card and the top of the page
    topImages: [],                            // extra photos at the top, e.g. [`images/a.jpg`, `images/b.jpg`]
    summary: `A lead-screw parallel gripper for the rover arm with custom-machined parts, holding loads up to 5 kg.`,
    tools: [`CAD`, `CNC machining`, `Lead screw mechanism`],

    objective: `Design and build a gripper for the JHU Mars Rover's robotic arm that grasps securely and holds loads of up to 5 kg.`,
    role: `- Designed the parallel gripper in CAD as a member of the mechanical sub-team.
- Manufactured its custom-machined components.
- Led design reviews for rover subsystems, presenting the rationale from mission requirements through concept evaluation, motor selection, electronics and prototyping.`,
    overview: `The gripper drives its parallel jaws with a self-locking lead screw mechanism, which improves grip stability.`,
    results: `- Secure grasp of loads up to 5 kg.`,
  },

  {
    id: `laser-flyer-optimization`,
    type: `research`,
    major: true,
    title: `HEMI Laser Flyer Research`,
    context: `Hopkins Extreme Materials Institute`,
    date: `May – Aug 2025`,
    status: ``,
    cover: ``,
    topImages: [],
    summary: `A Gaussian Process Regression model that guided high-impact laser flyer experiments and cut recast height by 35%.`,
    tools: [`Python`, `Gaussian Process Regression`, `EDM`, `Polishing`, `CAD`],

    lab: `Hopkins Extreme Materials Institute (HEMI), Johns Hopkins University`,
    timeline: `May – Aug 2025`,
    role: `Research Assistant.`,
    objective: `Reduce recast in high-impact laser flyer experiments and improve flyer integrity.`,
    overview: `- Designed the experimental workflow and implemented a Gaussian Process Regression (GPR) optimization model.
- Manufactured Al and Cu samples with EDM and polishing to produce controlled surface-roughness specimens.
- Designed a compression grid in CAD that eliminated sample bulging in the holder assembly and improved alignment during laser shots.`,
    results: `- Reduced laser flyer recast height by 35% and improved flyer integrity.
- Presented the results to 15+ members at a lab group meeting.`,
  },

  {
    id: `glider-launcher`,
    type: `team`,
    major: false,
    title: `Glider Launcher Vehicle`,
    context: `MechE Design I (course)`,
    date: `Sep – Dec 2024`,
    status: `2nd of 22`,
    cover: ``,
    topImages: [],
    summary: `A vehicle that turns gravitational potential energy into elastic energy to launch a glider over a 4 ft wall 6 ft away.`,
    tools: [`SolidWorks`, `Laser cutting`, `Machining`],

    objective: `Design a vehicle that converts gravitational potential energy into elastic potential energy and launches a glider over an obstacle 4 ft tall and 6 ft away.`,
    role: `- Led a team of three.
- Designed the vehicle in SolidWorks and built it with laser cutting and machining.`,
    overview: ``,
    results: `- Placed 2nd of 22 teams in the JHU MechE Design Competition.`,
  },

  {
    id: `robot-arm`,
    type: `personal`,
    major: false,
    title: `Multi-DOF Robot Arm`,
    context: `Independent build`,
    date: `2026 –`,
    status: `In progress`,
    cover: ``,
    topImages: [],
    summary: `A self-designed robot arm with cycloidal reducers and closed-loop joint control.`,
    tools: [`Onshape`, `3D printing`, `Cycloidal drive`, `Encoders`],

    objective: `Learn to design and build cycloidal reducers and closed-loop joint control by building a complete robot arm.`,
    requirements: `- 5–7 degrees of freedom
- Payload of at least 1 kg
- Cycloidal reducers on BLDC or stepper motors
- Encoder feedback for closed-loop control`,
    overview: `Currently designing the arm in Onshape.`,
    results: `In progress.`,
  },

  {
    id: `sheath-auger-drill`,
    type: `team`,
    major: false,
    title: `Sheath Auger Soil Drill`,
    context: `JHU Mars Rover Team`,
    date: `Mar – Aug 2025`,
    status: ``,
    cover: ``,
    topImages: [],
    summary: `A sheathed auger that extracts soil from up to 10 cm deep and passes it to the rover's spectroscopy system.`,
    tools: [`CAD`, `Prototyping`, `Motor selection`],

    objective: `Collect soil samples from below the surface and deliver them to the rover's spectroscopy analysis system.`,
    role: `- Engineered the sheath auger drill as a member of the mechanical sub-team.`,
    overview: ``,
    results: `- Extracts soil from depths of up to 10 cm.
- Transfers samples reliably to the spectroscopy system.`,
  },

  {
    id: `arcade-launcher`,
    type: `team`,
    major: false,
    title: `Robotic Arm Launcher Arcade`,
    context: `MechE Design II (course)`,
    date: `Jan – Apr 2025`,
    status: ``,
    cover: ``,
    topImages: [],
    summary: `An arcade basketball game with a joystick-controlled robotic arm launcher, beam-break scoring and a score display.`,
    tools: [`Arduino (C++)`, `SolidWorks`, `3D printing`, `Laser cutting`],

    objective: `Build an interactive arcade-style basketball game with a joystick-controlled robotic arm launcher.`,
    role: `- Co-created the game.
- Led the SolidWorks design of the launcher arm, hoop structures and sensor housing.`,
    overview: `The game uses beam-break sensors for scoring and a UI display, programmed in Arduino (C++). Parts were rapid-prototyped with 3D printing and laser cutting.`,
    results: ``,
  },

  {
    id: `gpr-dislocation-plasticity`,
    type: `research`,
    major: false,
    title: `GPR Model for Dislocation Plasticity`,
    context: `ICE-4-iMD Lab, JHU`,
    date: `Jan – May 2025`,
    status: ``,
    cover: ``,
    topImages: [],
    summary: `A Python Gaussian Process Regression model that predicts material strength from size-dependent plasticity data.`,
    tools: [`Python`, `Gaussian Process Regression`],

    lab: `ICE-4-iMD Lab, Johns Hopkins University`,
    timeline: `Jan – May 2025`,
    role: `Research Assistant.`,
    objective: `Predict material strength for research on size-dependent dislocation plasticity.`,
    overview: `- Developed a GPR model in Python and optimized kernel selection to model dislocation behavior in metals.
- Reviewed experimental datasets from the literature.`,
    results: ``,
  },

  {
    id: `posture-detection`,
    type: `personal`,
    major: false,
    title: `Posture Detection & Analysis`,
    context: `Independent project + high school capstone`,
    date: `May 2023 – May 2024`,
    status: ``,
    cover: ``,
    topImages: [],
    summary: `A posture-detection web app and a 40+ student study linking demographics to sitting posture.`,
    tools: [`HTML`, `Pose estimation`, `Regression`, `Pearson correlation`, `Chi-square test`],

    objective: `Help computer users notice and correct poor sitting posture, and find out whether students' demographic characteristics relate to how they sit.`,
    requirements: ``,
    overview: `## Web app (May – Nov 2023)
- Built a web app around an open-source posture detection model to analyze the sitting posture of computer users.
- Analyzed each user's poor-posture data and matched it with recommendations and stretch videos.

## Capstone study (Sep 2023 – May 2024)
- Ran a correlation analysis between high school students' demographic data (6 categories) and their postural behaviors.
- Coordinated the observational study sessions and analyzed data from 40+ students.
- Used regression analysis, Pearson correlation, point-biserial correlation and chi-square tests.`,
    results: `- Visual graphics in the app let users track their improvement over time.`,
  },

];


/* ───────────────────────────────────────────────────────────────────────────
   BLOG POSTS
   Newest date shows first automatically. Date format: YYYY-MM-DD
   cover is the small picture shown on the right of the post in the list
   (and on top of the post page).  draft: true shows a "Draft" tag.
   ─────────────────────────────────────────────────────────────────────────── */

const POSTS = [

  {
    id: `self-locking-lead-screw`,
    title: `Why a self-locking lead screw for a rover gripper`,
    date: `2025-09-02`,
    tag: `Design notes`,
    cover: ``,
    draft: true,
    excerpt: `A gripper that holds its grip with the motor off, and the trade-off you accept to get it.`,
    body: `STARTER DRAFT. Rewrite this in your own words, then set draft: false.

On the rover gripper, the jaws are driven by a lead screw. A rover arm spends a lot of time holding things, and a motor that has to keep pushing to hold a sample wastes power and heat.

## What "self-locking" means

A lead screw is self-locking when the load on the jaws cannot spin the screw backwards. That happens when the thread's lead angle is small compared to the friction angle between screw and nut.

## The trade-off

The same friction that locks the screw lowers its efficiency, so the motor works harder when closing. For a gripper that holds far more often than it moves, that is a good trade.`,
  },

  {
    id: `starting-robot-arm`,
    title: `Starting a robot arm build`,
    date: `2026-10-01`,
    tag: `Build log`,
    cover: ``,
    draft: true,
    excerpt: `Why I'm designing my own arm around cycloidal reducers and closed-loop control.`,
    body: `STARTER DRAFT. Rewrite this in your own words, then set draft: false.

I'm designing a multi-DOF robot arm from scratch. The goal is less about the final spec sheet and more about learning the hard parts myself: reduction, feedback and control.

## Why cycloidal drives

Write about why you picked cycloidal reducers.

## What comes next

Write about your next milestone.`,
  },

];
