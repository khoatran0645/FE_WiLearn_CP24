import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, Autocomplete, Chip, Typography, Avatar, Input } from '@mui/material';

const defaultAvatar = '/src/assets/default.jpg';

export default function CreateGroup() {
    const [openDialog, setOpenDialog] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [subject, setSubject] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [groupIntro, setGroupIntro] = useState('');

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCreateGroup = () => {
        console.log('Creating group:', { groupName, subject, groupIntro });
        setOpenDialog(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <>
            <Button style={{
                textAlign: "center",
                fontSize: "14px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginLeft: "900px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}
                onClick={() => setOpenDialog(true)}>
                + Create group
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Group Name"
                        fullWidth
                        sx={{ marginTop: '10px' }}
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <TextField
                        label="Introduction"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ marginTop: '15px' }}
                        value={groupIntro}
                        onChange={(e) => setGroupIntro(e.target.value)}
                    />
                    <Box sx={{ marginTop: '1rem' }}>
                        <Autocomplete
                            id="tags-outlined"
                            options={["React", "Python", "Java"]}
                            value={subject}
                            onChange={(event, newValue) => {
                                setSubject(newValue);
                            }}
                            multiple
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip key={option} variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Subject"
                                    placeholder="Select subject"
                                />
                            )}
                        />
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                        <Typography variant="h7" marginBottom={1}>Image group</Typography>
                        <Avatar
                            style={{ width: '150px', height: '150px', borderRadius: 0 }}
                            src={selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar}
                        />
                        <Input
                            accept="image/*"
                            type="file"
                            id="avatar-upload"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="avatar-upload">
                            <Button
                            variant="contained"
                            component="span"
                            style={{
                                marginTop: '16px',
                                padding: '2px 5px',
                                backgroundColor: 'transparent',
                                color: '#000',
                                border: '1px solid #000',
                                fontSize: '12px',
                            }}
                            >
                            Choose File
                            </Button>
                        </label>
                        {selectedFile ? (
                            <Typography variant="body2" marginTop="10px">Local avatar selected: {selectedFile.name}</Typography>
                        ) : (
                            <Typography variant="body2" marginTop="10px">No local avatar is set. Use the upload field to add a local image.</Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions style={{ padding: '16px' }}>
                    <Button onClick={handleCloseDialog} color='inherit'>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateGroup} color='success' >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
