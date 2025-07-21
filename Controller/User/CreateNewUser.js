import DB from "../../ConnectDB/DB.js";
import { DefaultExperience } from "../../Constant/Experience.js";
import { DefaultSkills } from "../../Constant/Skills.js";

export const CreateNewUser = async (req, res) => {
  try {
    const Query =
      "INSERT INTO account (Name, Bio, ResumeLink ,GitHubLink ,LinkedInLink ,TwitterLink,MediumLink) VALUES (?, ? ,? ,? ,? ,? ,? )";
    const Value = [
      "Mohamed Osama",
      "👨‍💻Full Stack Developer with expertise in React.js, React Native, Node.js & MongoDB. Passionate about building performant, scalable apps that solve real business needs.🏆 Experienced in AJAX, React Query, Express, and writing clean, maintainable code.🌱",
      "https://drive.google.com/file/d/1iUR1S4ONU1R4PDrqrQOlFuzbH6jK9DPE/view?usp=drivesdk",
      "https://github.com/moshaosama",
      "https://www.linkedin.com/in/thisfekry/",
      "https://x.com/mohamedosfekry",
      "https://medium.com/@mohamedosfekry",
    ];

    const [resultCraete] = await DB.promise().query(Query, Value);

    const UserQuery = "SELECT * FROM account WHERE id = ?";
    const [valueUser] = [resultCraete.insertId];

    const [resultGet] = await DB.promise().query(UserQuery, valueUser);

    const QueryCreateProject =
      "INSERT INTO projects (image, title, description,skills,githubLink,liveDemoLink,user_id) VALUES (?,?,?,?,?,?,?)";

    const ValueCreateProject = [
      "",
      "CategYou - YouTube Playlist Organizer",
      "Transform your YouTube experience with nested folders, smart sorting, and intuitive drag-and-drop organization for your Liked Videos playlist.",
      JSON.stringify(DefaultSkills),
      "https://github.com/moshaosama/MyFolio",
      "https://my-folio-iota-eight.vercel.app/",
      resultCraete.insertId,
    ];

    for (let i = 0; i <= 2; i++) {
      await DB.promise().query(QueryCreateProject, ValueCreateProject);
    }

    const QueryCreateSkill =
      "INSERT INTO skills (skills, image_skill ,user_id) VALUES (?,?,?)";

    await Promise.all(
      DefaultSkills.map((skill) =>
        DB.promise().query(QueryCreateSkill, [
          skill.name,
          "",
          resultCraete.insertId,
        ])
      )
    );

    const QueryCreateContact =
      "INSERT INTO contact_us (Email, Phone, Location , user_id) VALUES (?,?,?,?)";

    const ValueCreateContact = [
      "mohamedOSFekry@gmail",
      "+20 1004365707",
      "Giza, Egypt",
      resultCraete.insertId,
    ];

    await DB.promise().query(QueryCreateContact, ValueCreateContact);

    const QueryCreateExperience =
      "INSERT INTO experience (Date,Title,Foundation,Description,Icon,Position,user_id) VALUES (?,?,?,?,?,?,?)";

    await Promise.all(
      DefaultExperience.map((experience) =>
        DB.promise().query(QueryCreateExperience, [
          experience.Date,
          experience.Title,
          experience.Foundation,
          experience.Description,
          experience.Icon,
          experience.Position,
          resultCraete.insertId,
        ])
      )
    );

    return res.status(200).json({
      statusbar: "success",
      message: "Created Successfully",
      user: resultGet,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err,
    });
  }
};
