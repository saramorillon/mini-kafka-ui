import { useCallback } from 'react'
import { ConnectDragPreview, ConnectDragSource, ConnectDropTarget, useDrag, useDrop } from 'react-dnd'
import { IGroup } from '../models/IGroup'

interface IDraggedItem {
  draggedItem: IGroup
  parent: string
}

interface IDndResult {
  drag: [{ isDragged: boolean }, ConnectDragSource, ConnectDragPreview]
  drop: [{ isOver: boolean }, ConnectDropTarget]
}

export function useDnd(type: 'connection' | 'group', item: IGroup, parent: string): IDndResult {
  const collectDrag = useCallback((monitor) => ({ isDragged: monitor.isDragging() }), [])
  const dragResult = useDrag(() => ({ item: { draggedItem: item, parent }, type, collect: collectDrag }), [item])

  const collectDrop = useCallback((monitor) => ({ isOver: monitor.isOver() }), [])
  const drop = useCallback(({ draggedItem, parent }: IDraggedItem) => console.log(draggedItem, parent, item), [])
  const dropResult = useDrop(() => ({ accept: ['connection', 'group'], drop, collect: collectDrop }), [item])

  return { drag: dragResult, drop: dropResult }
}
