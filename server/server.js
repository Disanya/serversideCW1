const app = require("./app");
const PORT = process.env.PORT || 5000;
//running the server on 500 port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
