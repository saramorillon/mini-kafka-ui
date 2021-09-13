import { useCallback, useContext, useEffect, useState } from 'react'
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd'
import { ConfigContext } from '../contexts/ConfigContext'
import { IGroup } from '../models/IGroup'

interface IDndResult {
  drag: [{ isDragged: boolean }, ConnectDragSource, ConnectDragPreview]
  drop: [{ isOver: boolean; isStayedOver: boolean }, ConnectDropTarget]
}

export function useDnd(type: 'connection' | 'group', item: IGroup): IDndResult {
  const { dispatch } = useContext(ConfigContext)
  const [isStayedOver, setStayedOver] = useState(false)

  const collectDrag = useCallback((monitor) => ({ isDragged: monitor.isDragging() }), [])
  const dragResult = useDrag(() => ({ item, type, collect: collectDrag }), [item])

  const collectDrop = useCallback((monitor: DropTargetMonitor) => ({ isOver: monitor.isOver(), isStayedOver }), [])
  const drop = useCallback((draggedItem: IGroup) => dispatch({ type: 'move', item: draggedItem, parent: item.key }), [])
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
