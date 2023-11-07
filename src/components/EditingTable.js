import { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomId
} from '@mui/x-data-grid-generator';
import { useDispatch } from 'react-redux';
import { updateTask } from '../reducers/tasksReducer';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const EditingTable = ({ task, activities, startTime, endTime }) => {
  const [rows, setRows] = useState(activities);
  const [rowModesModel, setRowModesModel] = useState({});
  const dispatch = useDispatch()

  const dataGridRef = useRef();

  useEffect(() => {
    setRows(activities);
  }, [activities])

  const formatDateTime = (value) => {
    const date = new Date(value)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const time = date.toLocaleTimeString('en-US', { hour12: false })

    return `${year}-${month}-${day} ${time}`
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    console.log('handleEditClick')
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log('handleSaveClick')
    console.log(id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    console.log('handleDeleteClick')
    console.log(id)
    const newRows = rows.filter((row) => row.id !== id)
    setRows(newRows);
    const newActivities = task.activities.filter(activity => activity.id !== id)
    const newTask = { ...task, activities: newActivities };
    console.log('After delete:', newTask.activities)
    console.log(newTask)
    dispatch(updateTask(task.id, newTask))

    dataGridRef.current.focus();
  };

  const handleCancelClick = (id) => () => {
    console.log('handleCancelClick')
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const getCurrentTimestamp = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is 0-based, so add 1
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);

    const currentTimestamp = `${month}/${day}/${year}, ${hour}:${minute}:${second}`;
    return currentTimestamp;
  }

  const processRowUpdate = (newRow) => {
    console.log('newRow:', newRow);

    if (newRow.start_time > newRow.end_time) {
      try {
        console.log('call error handler')
        setRows((rows) => {
          if (newRow.isNew) {
            return rows.filter((row) => row.id !== newRow.id);
          } else {
            return rows;
          }
        });
        console.log('remove wrong data')
        return
      } catch (error) {
      }
    }

    if (newRow.start_time < startTime || newRow.end_time > endTime) {
      return
    }

    const temp = {
      start_time: getCurrentTimestamp(newRow.start_time),
      end_time: getCurrentTimestamp(newRow.end_time),
      id: newRow.id
    }

    const newActivities = newRow.isNew
      ? [...task.activities, temp]
      : task.activities.map(activity => activity.id === newRow.id ? temp : activity)

    const updatedTask = { ...task, activities: newActivities.sort((a, b) => new Date(a.start_time) - new Date(b.start_time)) };
    console.log(updatedTask)

    //tasksServices.update(task.id, updatedTask)
    dispatch(updateTask(task.id, updatedTask))

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows
      .map((row) => (
        row.id === newRow.id ? updatedRow : row
      ))
      .sort((a, b) => a.start_time - b.start_time)
    );
    console.log('updatedRow: ', updatedRow)
    return updatedRow;
  };

  const onProcessRowUpdateError = (error) => {
    window.alert(`Invald Time Range!`)
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'start_time',
      headerName: 'Start Time',
      type: 'dateTime',
      width: 300,
      editable: true,
      renderCell: (params) => (
        <div tabIndex={0}>{formatDateTime(params.value)}</div>
      )
    },
    {
      field: 'end_time',
      headerName: 'End Time',
      type: 'dateTime',
      width: 300,
      editable: true,
      valueFormatter: (params) => formatDateTime(params.value),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 670,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
      tabIndex="0"
    >
      <DataGrid
        ref={dataGridRef}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

export default EditingTable