import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header() {
return (
	<AppBar position="static">
		<Toolbar>
		{/* The Typography component applies
		default font weights and sizes */}

		<Typography variant="h5"
			component="div" sx={{ flexGrow: 1 }}>
			Your To Do List
		</Typography>
		</Toolbar>
	</AppBar>
);
}
