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
   • To add a video (MP4), upload it to the "videos" folder plus a preview
     picture with the same name ending in .jpg, then write:
       [video: videos/your-clip.mp4 | right | Caption under the video]
   • To show 2–3 pictures side by side in one row:
       [gallery: images/a.jpg, images/b.jpg | One caption for the row]
   ═══════════════════════════════════════════════════════════════════════════ */

const SITE = {
  name: `Minsuh (Ben) Cho`,
  email: `mscho40905@gmail.com`,
  linkedin: `https://www.linkedin.com/in/bencho0905`,
  resume: `resume.pdf`,          // the résumé PDF in the main folder
  portrait: `images/ben-portrait.jpg`,
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

   ORDER: the two major projects show first. All other projects are sorted
   automatically by their end date (the part of  date  after the dash),
   newest first. A project with no end date yet (e.g. `2026 –`) or with
   status `Upcoming` / `In progress` counts as the newest.

   highlight (optional) puts a key result on the homepage card's photo,
   e.g.  highlight: [`−35%`, `recast height`],   Leave it out if there is none.

   cover is the main photo, used on the homepage card and at the top of the page.
   To show a different photo on the homepage card only, add:  card: `images/x.jpg`,

   id is the project's web address: project.html?id=parallel-gripper
   Use lowercase letters and dashes only, and never reuse an id.
   ─────────────────────────────────────────────────────────────────────────── */

const PROJECTS = [

  {
    id: `parallel-gripper`,
    type: `team`,
    major: true,
    title: `Parallel Robotic Gripper`,
    context: `JHU Mars Rover Team (Hopkinauts)`,
    date: `Mar – Aug 2025`,
    status: ``,
    highlight: [`5 kg`, `payload`],      // optional key number shown on the homepage card
    cover: `images/gripper-built-wide.jpg`,
    topImages: [`images/gripper-built-top.jpg`],
    summary: `A lead-screw parallel gripper for the rover arm, sized for 98 N of grip force to carry 5 kg objects and handle servicing tasks like typing and flipping switches.`,
    tools: [`CAD`, `TR8×2 lead screw`, `NEMA 17 stepper`, `Engineering calculations`, `CNC machining`],

    objective: `Design a gripper for the rover's robotic arm that can complete two kinds of competition missions:

- **Delivery:** pick up and carry lightweight instruments, rocks or supply containers of up to 5 kg, each with a graspable feature under 7.5 cm in diameter
- **Equipment servicing:** open a drawer, type on a keyboard, operate a joystick, push buttons, flip switches and turn knobs`,

    role: `- Designed the gripper on the mechanical sub-team, from concept selection through motor sizing and the final CAD prototype.
- Ran the engineering calculations for grip force and motor torque, and selected the lead screw, motor and driver.
- Manufactured the custom-machined components.
- Led the gripper design review for the team (Aug 2025), and led design reviews for other rover subsystems, walking through the rationale from mission requirements to concept evaluation, motor selection, electronics and prototyping.`,

    overview: `## Design constraints
- **Grip force:** 98 N total (49 N per claw), based on the friction of the TPU grip surface
- **Stroke:** 7.5 cm, or 9–10 cm with clearance
- **Durability:** metal C-shaped frame, with support along the lead screw
- **Weight:** under 2.5 kg

## Choosing the concept
[image: images/gripper-concept-angular.jpg | right | Early concept: claw finger on a linear-rail carriage]
I compared an angular claw, driven by a lead screw or gears, with a two-finger parallel gripper. I dropped the angular claw because its grip force changes with grip position, it is less reliable at holding heavy objects, and it needs more parts.

The parallel gripper won because it is simpler, and a hooked finger can pull more weight. It is driven by a lead screw, with a support shaft in place of a linear rail.

[image: images/gripper-concept-parallel.jpg | full | Selected layout: lead screw drive with a support shaft]

## Lead screw selection
I chose a single-start TR8×2 lead screw over a multi-start TR8×4. It gives more grip force, and its low backdrivability makes it **self-locking**, so the jaws hold an object without the motor pushing. The trade-off is slower motion and more friction, but a full grip stroke still takes only a few seconds.

## Sizing the motor
The worst case is a 5 kg object with no handle, held by friction alone. With a friction coefficient of about 0.5 for TPU, each claw needs 49 N of grip force, or 98 N in total.

The required motor torque is T = F × (L / 1000) / (2πe), where L is the screw lead (2 mm/rev) and e is the lead screw efficiency (0.2, unlubricated). That gives 0.156 N·m, or **0.312 N·m with a safety factor of 2**.

[gallery: images/gripper-force-analysis.jpg, images/gripper-torque-calc.jpg | Worst-case force analysis (left) and motor torque calculation (right)]

## Final prototype design
[gallery: images/gripper-final-cad.jpg, images/gripper-front-view.jpg | Final prototype CAD: isometric and front views]

## Electronics
- **Motor:** NEMA 17 stepper with a 100 ppr encoder, 1.8° step angle, 1.5 A per phase and 45 N·cm (0.45 N·m) holding torque, which covers the 0.312 N·m requirement
- **Driver:** 2.8 A stepper driver with 1/256 microstepping for quiet operation

## Test plan
- **Grip strength:** carry an object of 5 kg or more
- **Repeatability:** pick up a 5 kg object 20 times and record each success
- **Orientation:** pick up a 5 kg object from angled positions
- **Speed:** time a full open and close
- **Keyboard:** measure typing accuracy`,

    results: `[video: videos/gripper-demo.mp4 | right | Bench test: the stepper drives the lead screw to open and close the jaws]
- Built the gripper and ran it on the bench with the NEMA 17 stepper and lead screw drive.
- The gripper securely grasps loads of up to 5 kg.
- Estimated weight at the design review was 1.0 kg, well under the 2.5 kg limit.
- Next steps identified at the review: the gripper-to-arm mount and actuation, further weight reduction on the C-bracket, grip-surface material and 3D-printing orientation for the claws, and where to add metal plating.`,
  },

  {
    id: `laser-flyer-optimization`,
    type: `research`,
    major: true,
    title: `Laser-Cut Flyer Optimization`,
    context: `Hopkins Extreme Materials Institute`,
    date: `May – Aug 2025`,
    status: ``,
    highlight: [`−35%`, `recast height`],
    cover: `images/hemi-profile-scan.jpg`,
    topImages: [`images/hemi-sample-array.jpg`],   // main photo row: 3D scan of the recast rim + mounted samples
    summary: `A Gaussian Process Regression model that optimized laser cutting of titanium flyers for high-impact experiments, cutting recast height by 35%.`,
    tools: [`Python`, `Gaussian Process Regression`, `Laser cutting`, `Wire EDM`, `Diamond wire saw`, `Polishing`, `CAD`, `Optical profilometry`],

    lab: `Hopkins Extreme Materials Institute (HEMI), Johns Hopkins University`,
    timeline: `May – Aug 2025`,
    role: `Research Assistant (full-time, summer 2025). I designed the experimental workflow, built the optimization model, prepared samples and designed fixture hardware.`,
    objective: `In high-impact experiments, a thin flyer is laser-cut from titanium and then launched into a target. Laser cutting leaves **recast**, a raised rim of resolidified material along the cut edge.

The goal was to reduce recast height and make even cuts, so that when the flyer is hit it launches straight in the impact direction and its whole surface detaches cleanly.`,
    overview: `## Optimizing the experiments
- Designed the experimental workflow and implemented a Gaussian Process Regression (GPR) optimization model to choose experiment settings.

## Sample preparation
Manufactured Al and Cu samples with controlled surface roughness, choosing the cutting method by the shape needed:
- **Wire EDM** for round, circular cuts
- **Diamond wire saw** for rectangular cuts
- **Polishing** to bring each surface to the target roughness

[gallery: images/hemi-wire-saw.jpg, images/hemi-polishing.jpg, images/hemi-surface-microscope.jpg | Cutting rectangular samples on the diamond wire saw, automated polishing on a MultiPrep machine, and a sample surface partway through polishing, flatter than the starting surface]

## Fixture design
- Designed a compression grid in CAD that eliminated sample bulging in the holder assembly and improved alignment during laser shots.`,
    results: `- Reduced laser flyer recast height by 35% and improved flyer integrity.
- Presented the results to 15+ members at a lab group meeting.

[gallery: images/hemi-profile-slice.jpg, images/hemi-microscope-measure.jpg | Profilometry slice measuring recast height along a laser cut (left) and measuring cut diameters under the microscope (right)]`,
  },

  {
    id: `glider-launcher`,
    type: `team`,
    major: false,
    title: `Glider Launcher Vehicle`,
    context: `JHU MechE Design Competition`,
    date: `Sep – Dec 2024`,
    status: `2nd Place of 22 Teams`,
    cover: `images/glider-vehicle-angle.jpg`,
    topImages: [`images/glider-vehicle-side.jpg`, `images/glider-release-mechanism.jpg`],
    summary: `A gravity-powered vehicle that stores energy in rubber bands on the way down a ramp, then launches a glider over a 4 ft wall 6 ft away.`,
    tools: [`SolidWorks`, `Laser cutting`, `Bandsaw`, `Drill press`, `Wood, acrylic, foam core`],

    objective: `[image: images/glider-course-schematic.jpg | right | Competition course: the ramp and barrier (top) and the hall layout (bottom)]
Design and build a vehicle that rolls down a 6 ft ramp into a barrier, then launches a glider over an obstacle 4 ft tall and 6 ft away, across the hall toward the fireplace.

The vehicle's only energy source is the gravitational potential energy from the ramp, so it has to store that energy as elastic potential energy on the way down and release it at the barrier.`,

    role: `- Led a team of three.
- Designed the vehicle in SolidWorks and sketched the launch and release mechanisms.
- Built it from wood, acrylic and foam core using laser cutting, a bandsaw and a drill press.`,

    overview: `## Ideation
[image: images/glider-launch-sketches.jpg | left | Early sketches of launch mechanism ideas]
**Storing the energy:** gears and pulleys on the wheel axle wind up a thread as the vehicle rolls, stretching rubber bands.

**Launch options considered:**
- A catapult lever with rubber bands at the front and a thread pulling from the back
- A rubber band and rod system, with the rod pulled back by the thread
- An L-shaped "chair" block that carries the glider, pulled by rubber bands in front and the thread behind

## Final design
- **Gear and pulley:** a small and a large gear multiply the pull on the thread as the wheels turn.
- **Launch:** a wooden hook on the glider's body catches the rubber bands, and the thread ties to a small hole in the back of the glider to pull it back.
- **Release:** a custom piece lets go of the thread when the push stick at the front hits the wall. A thread from the push stick pulls a lever on the release piece.

[gallery: images/glider-shop-front.jpg, images/glider-shop-side.jpg | The vehicle in the shop: launch ramp with the release mechanism and gear train (left), and side view (right)]

[image: images/glider-release-prototype.jpg | right | Release prototype: five acrylic parts and four wooden rods]
The release mechanism was the hardest part, because it had to hold the full tension of the rubber bands, then let go cleanly at the moment of impact. I prototyped it in laser-cut acrylic with wooden rods.

[image: images/glider-release-sketch.jpg | full | How the release works: pulling the thread frees the hook and launches the glider]

## Drawings
In the side view, the blue thread runs to the pulley that pulls the glider back, and the red thread runs from the push stick to the release mechanism. A rod in the middle keeps the red thread tight from the start of the pull to the end.

[gallery: images/glider-iso-sketch.jpg, images/glider-ortho-sketch.jpg | Isometric view of the final vehicle (left) and side view with an auxiliary view of the release mechanism (right)]
[gallery: images/glider-exploded-sketch.jpg, images/glider-glider-sketch.jpg | Exploded view of the final vehicle (left) and isometric view of the final glider (right)]`,

    results: `[image: images/glider-launcher-closeup.jpg | right | Launch ramp and release on the finished vehicle]
- Placed **2nd of 22 teams** in the JHU MechE Design Competition.
- Built a working vehicle that charges its launcher entirely from the ramp descent and fires automatically on impact.`,
  },

  {
    id: `robot-arm`,
    type: `personal`,
    major: false,
    title: `Multi-DOF Robot Arm`,
    context: `Independent build`,
    date: `2026 –`,
    status: `Upcoming`,
    cover: `images/robot-arm-kinematic-sketch.jpg`,
    topImages: [],
    summary: `A self-designed robot arm with cycloidal reducers and closed-loop joint control.`,
    tools: [`Onshape`, `3D printing`, `Cycloidal drive`, `Encoders`],

    objective: `Learn to design and build cycloidal reducers and closed-loop joint control by building a complete robot arm.`,
    requirements: `- 5–7 degrees of freedom
- Payload of at least 1 kg
- Cycloidal reducers on BLDC or stepper motors
- Encoder feedback for closed-loop control`,
    overview: `Currently designing the arm in Onshape. The kinematic sketch at the top shows the planned layout: six revolute joints (J1–J6), the links between them, and the joint angles θ1–θ6.`,
    results: `In progress.`,
  },

  {
    id: `arcade-launcher`,
    type: `team`,
    major: false,
    title: `Robotic Launcher Arcade`,
    context: `MechE Design II (course)`,
    date: `Jan – Apr 2025`,
    status: ``,
    cover: `images/arcade-launcher-front.jpg`,
    topImages: [`images/arcade-controls.jpg`, `images/arcade-fair-play.jpg`],
    summary: `"The Ollie Toss": an arcade basketball game where players aim and fire a robotic launcher arm with a joystick, with beam-break scoring and live score displays.`,
    tools: [`SolidWorks`, `Arduino (C++)`, `Servos`, `Beam-break sensors`, `3D printing`, `Laser cutting`],

    objective: `Design and build a working arcade game for the course's arcade fair, themed on the film Hoosiers. Our team of four chose a single-player basketball shooting game, "The Ollie Toss," named after the character Ollie and his underhand "granny shot."

The game had to:
- Let a player aim and fire balls at hoops of different difficulty using a joystick and a button
- Count scores automatically and challenge players to beat the high score
- Feel like a real arcade cabinet, with displays, lights and sound`,

    role: `- Co-created the game as one of four team members.
- Led the SolidWorks design of the launcher arm, hoop structures and sensor housing.
- Sketched the cabinet frame, launcher concept and user interface for the proposal, and drew the gameplay storyboard.
- Prototyped parts with 3D printing and laser cutting.`,

    overview: `## The concept
[image: images/arcade-sketch-frame.jpg | right | Proposal sketch of the cabinet frame, displays and controls]
In our proposal, the player shoots five balls at hoops of varying difficulty and tries to beat the previous record:
- A **rotating launcher arm** turns left and right, and the player sets shot power with a joystick
- **Ball return:** missed and scored balls roll back to a basket, and the player reloads the launcher by hand
- **Scoring:** beam-break sensors detect a ball passing through each hoop

I sketched the overall frame, a catapult-style launcher inspired by the granny shot, and the control panel layout with dimensions.

[gallery: images/arcade-sketch-catapult.jpg, images/arcade-sketch-interface.jpg | Early catapult launcher concept (left) and control panel top and front views (right)]

## Storyboard
The storyboard maps one full game, from pressing start to the final score:
1. The player presses the button to start, and balls drop from the hopper into the ball box.
2. The player loads a ball into the launcher and sets direction and power with the joystick.
3. Pressing the button swings the arm and releases the ball.
4. A ball through a hoop trips a beam-break sensor, adds to the score, and triggers lights and sound.
5. The ball rolls down a ramp back to the hopper, where another sensor counts it as one launch.
6. After five launches, the display shows the final score.

[image: images/arcade-storyboard.jpg | full | Gameplay storyboard]

## Prototyping the launcher
The first launcher prototype was a 3D-printed, servo-driven arm with a gear train that swings the throwing arm. We tested its shots on the bench before refining the design for the final cabinet.

[image: images/arcade-first-prototype.jpg | left | First launcher prototype]
[video: videos/arcade-prototype-test.mp4 | right | First prototype launch test (slowed 4×)]

## The final game
The finished cabinet has a joystick to aim left and right and set power, a large launch button, an LCD screen, speakers, and a ball tray. Four hoops worth 1, 5, 10 and 20 points sit on the backboard under laser-engraved "High Score" and "Current Score" displays. The whole game runs on Arduino (C++).`,

    results: `- Presented a fully working game at the course arcade fair, where visitors played it.
- Beam-break sensors scored shots automatically, and the displays tracked current and high scores.

[video: videos/arcade-fair-demo.mp4 | left | Live demo at the arcade fair]
[image: images/arcade-team.jpg | right | Our team with the finished game]`,
  },

  {
    id: `posture-detection`,
    type: `personal`,
    major: false,
    title: `Sit Up: Posture Detection & Analysis`,
    context: `Mercersburg Academy · Research Science Capstone`,
    date: `May 2023 – May 2024`,
    status: ``,
    highlight: [`40+`, `students studied`],
    card: `images/situp-card.jpg`,           // optional: a different photo for the homepage card only
    cover: `images/situp-detection.jpg`,
    topImages: [`images/situp-dashboard.jpg`],
    summary: `A posture-detection web app, and a 40+ student study using it to test how six demographic factors relate to sitting posture.`,
    tools: [`Web app`, `Open-source pose detection model`, `Data visualization`, `Point-biserial correlation`, `Pearson correlation`, `Chi-square test`],

    objective: `US teenagers spend about eight hours a day sitting, much of it hunched over screens, and poor sitting posture is linked to back pain, lower productivity and longer-term musculoskeletal problems.

I wanted to measure sitting posture objectively, without an observer, and use that data to find which factors in students' lives are linked to poor posture. The goal was to give my school evidence-based recommendations for improving posture, which could also apply to other boarding schools.`,

    requirements: `- Track posture in real time with only a laptop's built-in webcam, with no extra sensors
- Detect poor posture, and log time spent in good and poor posture, plus the share of each type of poor posture
- Collect each participant's demographic data through a sign-up page
- Run quietly during normal study sessions, so participants don't consciously correct their posture
- Keep participant data confidential, and run on school-loaned laptops instead of students' own computers`,

    overview: `## The web app: Sit Up
I built Sit Up as a web app around an open-source posture detection model. The **Posture Mirroring** page watches the user through the webcam while they work and tracks the position of their face.

[image: images/situp-posture-mirroring.jpg | full | Posture Mirroring page: the app detecting and tracking my face position through the webcam]

The **dashboard** turns that data into feedback:
- A weekly overview chart, with export to SVG, PNG or CSV
- A posture analysis that splits poor posture into four types: left/right, leaned, close, and up/down
- Total use time
- Recommended stretch and exercise videos matched to the user's posture problems

A sign-up page collects six demographic categories: sex, age, height, sports played, gaming habits, and the chair the student studies in.

## Study design
- Participants were recruited for an observational study of study habits, without being told the focus on posture, so the data reflects how they normally sit. Each gave informed consent.
- Students used Sit Up on IT-office MacBooks during two-hour study sessions on consecutive days, in small groups across several weeks.
- I coordinated the sessions and collected data from 40+ students.

## Matching each variable to the right test
The demographic data mixes continuous and categorical variables, so each one needed a different correlation method against time spent in poor posture:
- **Point-biserial correlation** for the two-option variable (sex)
- **Pearson correlation** for continuous variables (age, height)
- **Chi-square tests** for multi-category variables (sports, gaming habits, chair type), for example comparing swimmers with other students, or students using one dorm chair with everyone else
- Regression analysis to check the overall relationships`,

    results: `- A working posture-tracking web app that measures sitting posture automatically, removing observer bias and human error from data collection
- Postural and demographic data from 40+ students, analyzed across six demographic categories
- Visual analytics that let users track how their posture improves over time

**Links:** [Try the Sit Up web app](https://situpwebapp.netlify.app/) · [Read the research proposal](https://docs.google.com/document/d/1z2cdai8CRG5xdxP5lGoTsUJSZHtmxBwUzHZ-04R8238/edit?usp=sharing)`,
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
    cover: `images/blog-leadscrew-vs-rail.jpg`,
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
    cover: `images/blog-cycloidal-exploded.jpg`,
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
