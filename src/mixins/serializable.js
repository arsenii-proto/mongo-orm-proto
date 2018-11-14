/*
    retrieved - Was get raw data from database [Model.find(1)]
    creating - It does not exist on database and we start to create it right now [model.save()] 1
    created - It was not existed on database and we store it right now [model.save()] 2
    updating - It exist on database and we start to update it right now [model.save()] 1
    updated - It was existed on database and we update it right now [model.save()] 2
    saving - We start to store/update it right now [model.save()] 3
    saved - We store/update it right now [model.save()] 4
    deleting - We start to remove it right now [model.remove()]
    deleted - We remove it right now [model.remove()]
*/
