import React from 'react';
import { Box, Stack } from "@mui/material";
import { useAppSelector, useAppDispatch } from '../stateManager/hooks';

export default function MapInfoCard (props : {id : number}) {

    console.log('rendered');

    const { id } = props;
    const activitiyInfo = useAppSelector(state=>state.ActivityReducer.find(item=>item.id==id))
    const regexp = new RegExp("[^0-9]{3} [0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}", 'g');
    const slots = activitiyInfo?.schedule.match(regexp);

    console.log(activitiyInfo?.schedule);

    return <Stack spacing={3} sx={{backgroundColor : 'white'}} direction='row'>
        <Stack width={150} spacing={1} direction='column'>
            <Box>{activitiyInfo?.title}</Box>
            <Stack direction='column'>
                {slots?.map((slot, index)=>(
                    <Box key={index}>{slot}</Box>
                ))}
            </Stack>
            <Box>{activitiyInfo?.location.address}</Box>
        </Stack>
        <Stack width={150} direction='column' justifyContent='space-between'>
            <Box>{activitiyInfo?.location.isNear ? "в двух шагах" : null}</Box>
            <Box>Записаться</Box>
        </Stack>
    </Stack>
}