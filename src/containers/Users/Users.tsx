import React, { useMemo, useState } from 'react'

import {
    Grid,
    Button,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    SelectChangeEvent
} from "@mui/material";
import orderBy from "lodash.orderby";

import { useGetUsersQuery } from "../../api/Users/Users";
import MProgress from "../../components/MUI/MProgress/MProgress";
import UsersCard from "./UsersCard/UsersCard";
import { IUser } from "../../api/Users/types";

import UsersStyle from "./styles";
import {useNavigate} from "react-router-dom";

enum SortType {
    ascSort = 'ascSort',
    descSort = "descSort"
}

const Users: React.FC = () => {
    const navigate = useNavigate()

    const redirect = () => {
        navigate('/users/newUser')
    }

    const styles = UsersStyle()

    const [filter, setFilter] = useState<string>('')
    const [sort, setSort] = useState<'' | SortType>('')

    const {
        isFetching,
        data,
        refetch
    } = useGetUsersQuery(
        undefined,
        { refetchOnMountOrArgChange: true }
    )

    const handleFilter = (event: React.BaseSyntheticEvent) => {
        setFilter(event.target.value)
    }

    const handleSort = (event: SelectChangeEvent) => {
        setSort(event.target.value as SortType);
    };

    const filteredData = useMemo(() => {
        if (data) {
            if (filter !== '') {
                return data.filter((user) => (
                    user?.username.toLowerCase().includes(filter.toLowerCase())
                ))
            }
            return data
        }
        return []
    }, [data, filter])

    const sortedAndFilteredData: Array<IUser> = useMemo(() => {
        if (sort === SortType.ascSort) {
            return orderBy(
                filteredData,
                ['id'],
                ['asc']
            )
        }
        if (sort === SortType.descSort) {
            return orderBy(
                filteredData,
                ['id'],
                ['desc']
            )
        }
        return filteredData
    },[sort, filteredData])

    return (
        <Grid container spacing={3}>
            <Grid
                container
                item
                spacing={3}
                alignItems='center'
                justifyContent='space-between'
            >
                <Grid item md={6} sm={12} xs={12}>
                    <Button
                        variant={'contained'}
                        onClick={redirect}
                    >
                        Создать пользователя
                    </Button>
                </Grid>
                <Grid
                    item
                    container
                    md={6} sm={12} xs={12}
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={3}
                >
                    <Grid item sm={6} xs={12}>
                        <FormControl size="small" sx={styles.fullWidth}>
                            <InputLabel id="select-label">Сортировать</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                size="small"
                                value={sort}
                                label="Сортировать"
                                onChange={handleSort}
                                sx={styles.fullWidth}
                            >
                                <MenuItem value="">Сбросить сортировку</MenuItem>
                                <MenuItem value={SortType.ascSort}>По возрастанию id</MenuItem>
                                <MenuItem value={SortType.descSort}>По убыванию id</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            value={filter}
                            onChange={handleFilter}
                            size={'small'}
                            label="Фильтрация по username"
                            sx={styles.fullWidth}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {isFetching && <MProgress />}
            {!isFetching && data && (
                <Grid item container spacing={3}>
                    {
                        sortedAndFilteredData.map((user) => (
                            <Grid item xs={12} key={user.id}>
                                <UsersCard user={user} refetch={refetch} />
                            </Grid>
                        ))
                    }
                </Grid>
            )}
        </Grid>
    )
}
export default Users

