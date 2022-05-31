import { BackgroundLight, } from '../colors';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Box, Grid, Modal, InputAdornment, TextField, styled, OutlinedInputProps, TextFieldProps } from '@mui/material';
import React, { FC, ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react';

import { FileCopy, LockOpen } from '@mui/icons-material'
import { Network } from '../types';
import { InstallDetails } from '../../electron/IMultiClientInstaller';


const ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    padding: '20px',
    borderRadius: '20px',
    background: BackgroundLight,
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const FileUploadField = styled(TextField)({
    '& label.Mui-focused': {
    },
    '& .MuiInput-underline:after': {
    },
    '& .MuiOutlinedInput-root': {
      paddingLeft: '0',
      cursor: 'pointer',
      '&:hover': {
        cursor: 'pointer'
      },
      '&:hover fieldset': {
        cursor: 'pointer',
      },
      '&.Mui-focused fieldset': {
        cursor: 'pointer'
      },
    },
  });

type ImportKeystoreProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>
  isModalOpen : boolean
  keyStorePath: string
  keystorePassword: string
  setKeystorePath: Dispatch<SetStateAction<string>>
  setKeystorePassword: Dispatch<SetStateAction<string>>
  resolve: () => void


//   setInstallationDetails: Dispatch<SetStateAction<InstallDetails>>,
//   installationDetails: InstallDetails,
}

// console.log(dialog.showOpenDialog({ properties: ['openFile'] }))


/**
 * This is the network picker modal component where the user selects the desired network.
 * 
 * @param props.handleCloseNetworkModal function to handle closing the network modal
 * @param props.setInstallationDetails the currently set installation details
 * @param props.installationDetails the current installation details
 * @returns the network picker element to render
 */
export const ImportKeystore: FC<ImportKeystoreProps> = (props): ReactElement => {

    const handleKeystorePathChange = (ev: ChangeEvent<HTMLInputElement>) => {
        props.setKeystorePath(ev.target.value)
      }
    const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
        props.setKeystorePassword(ev.target.value)
      }

  return (
    <Modal
    open={props.isModalOpen}
    onClose={() => props.setModalOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={ModalStyle}>
      <Typography id="modal-modal-title" align='center' variant="h4" component="h2">
        Import Validator Keys
      </Typography>
      <hr style={{ borderColor: 'orange' }} />
      <Grid container>
        <Grid xs={12} item container justifyContent={'flex-start'} direction={'column'}>
        <Grid item container alignItems={'center'} p={2} spacing={2}>
            <Grid item xs={6}>
            <span>Keystore File</span>
            </Grid>
            <Grid item xs={6}>
            <FileUploadField
                placeholder='keystore.json'
                sx={{ my: 2, minWidth: '215', cursor: 'pointer !important' }}
                variant="outlined"
                onChange={handleKeystorePathChange}
                value={props.keyStorePath}
                InputProps={{
                startAdornment: <InputAdornment sx={{paddingLeft: '14px'}} onClick={(ev) => {
                    ev.preventDefault()
                    console.log('clicking keystore')
                    window.electronAPI.invokeShowOpenDialog({
                        properties: ['openFile']
                    }).then(DialogResponse => {
                        if (DialogResponse.filePaths && DialogResponse.filePaths.length) {
                            props.setKeystorePath(DialogResponse.filePaths[0])
                        }
                    })
                }} position="start"><FileCopy /></InputAdornment>,
                }}
            />
            </Grid>
        </Grid>
          <Grid item container alignItems={'center'} p={2} spacing={2}>
            <Grid item xs={6}>
              <span>Keystore Password</span>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type={'password'}
                sx={{ my: 2, minWidth: '215' }}
                // label="Fallback URL" 
                variant="outlined"
                value={props.keystorePassword}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockOpen /></InputAdornment>,
                }}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} textAlign='center' my={2}>
            <Button 
                variant="contained" color="primary" onClick={() => {
                    props.setModalOpen(false)
                    props.resolve()
                } 
            }>Import</Button>
        </Grid>
      </Grid>
    </Box>
  </Modal>
  )
}