import React from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function GList({array}) {
    return(
        <>
            <List>
                {array.map(i => (
                    <ListItem>
                        <ListItemText primary={i.name}></ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    )
}