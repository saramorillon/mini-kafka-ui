import { useCallback, useEffect, useState } from 'react'
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd'
import { IGroup } from '../models/IGroup'

interface IDraggedItem {
  draggedItem: IGroup
  parent: string
}

interface IDndResult {
  drag: [{ isDragged: boolean }, ConnectDragSource, ConnectDragPreview]
  drop: [{ isOver: boolean; isStayedOver: boolean }, ConnectDropTarget]
}

export function useDnd(type: 'connection' | 'group', item: IGroup, parent: string): IDndResult {
  const [isStayedOver, setStayedOver] = useState(false)

  const collectDrag = useCallback((monitor) => ({ isDragged: monitor.isDragging() }), [])
  const dragResult = useDrag(() => ({ item: { draggedItem: item, parent }, type, collect: collectDrag }), [item])

  const collectDrop = useCallback((monitor: DropTargetMonitor) => ({ isOver: monitor.isOver(), isStayedOver }), [])
  const drop = useCallback(({ draggedItem, parent }: IDraggedItem) => console.log(draggedItem, parent, item), [])
  const [dropCollect, dropRef] = useDrop(
    () => ({ accept: ['connection', 'group'], drop, collect: collectDrop }),
    [item]
  )

  useEffect(() => {
    if (!dropCollect.isOver) setStayedOver(false)
    else setTimeout(() => setStayedOver(true), 0.5)
  }, [])

  return { drag: dragResult, drop: [{ ...dropCollect, isStayedOver }, dropRef] }
}
