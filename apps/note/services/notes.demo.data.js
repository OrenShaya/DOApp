
const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        updatedAt: 1113333,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'red', //utilService.getRandomColor(),
        },
        info: {
            title: 'My very first note',
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112222,
        updatedAt: 1113333,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'green', 
        },
        info: {
            title: 'very note',
            txt: 'Second note Baby!'
        }
    },
    {
        id: 'n103',
        createdAt: 1112222,
        updatedAt: 1113333,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'yellow', 
        },
        info: {
            title: 'Most noty note',
            txt: 'Such a third note thing to do'
        }
    },
    {
        id: 'n104',
        createdAt: 1112222,
        updatedAt: 1113333,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'blue',
        },
        info: {
            title: 'exciting title',
            txt: 'Can\'t believe you actually made four of these'
        }
    },
]

export const noteDemoData = {
    notes
}