import { useMemoizedFn, useSetState } from 'ahooks'
import { Space, Tooltip } from 'antd'
import { useMemo, useRef } from 'react'

import { CopyOutlined, PrinterOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'

import { getPoetryList } from './apis/get-poetry-list'

interface Poetry {
  id: string
  poetryId: string
  title: string
  author: string
  paragraphs: string[]
  tags: string[]
  dynasty: string
}

const valueEnum = {
  唐: { text: '唐' },
  宋: { text: '宋' },
}

const TangSong = () => {
  const [state, setState] = useSetState<{
    previewPoetries: Poetry[]
  }>({ previewPoetries: [] })

  const { previewPoetries } = state
  const ref = useRef<ActionType>()

  const copy = useMemoizedFn(async (poetryIds: string[]) => {
    ref.current?.reload()
  })

  const columns: ProColumns<Poetry>[] = useMemo(
    () => [
      {
        title: '诗词ID',
        dataIndex: 'poetryId',
        width: 100,
        ellipsis: true,
        copyable: true,
      },
      {
        title: '名称',
        dataIndex: 'title',
        width: 150,
        ellipsis: true,
      },
      {
        title: '作者',
        dataIndex: 'author',
        width: 100,
        ellipsis: true,
      },
      {
        title: '内容',
        dataIndex: 'paragraphs',
        renderText: (paragraphs: string[]) => paragraphs.join(''),
        ellipsis: true,
        copyable: true,
      },
      {
        title: '标签',
        dataIndex: 'tags',
        renderText: (tags: string[]) => tags.join('、'),
        width: 200,
        ellipsis: true,
      },
      {
        title: '朝代',
        dataIndex: 'dynasty',
        width: 60,
        dataType: 'select',
        valueEnum,
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        width: 80,
        render: (_, record: Poetry) => {
          return (
            <>
              <Tooltip overlay="打印">
                <PrinterOutlined
                  onClick={() => {
                    setState({ previewPoetries: [record] })
                  }}
                />
              </Tooltip>
              <Tooltip overlay="复制">
                <CopyOutlined
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    copy([record.poetryId])
                  }}
                />
              </Tooltip>
            </>
          )
        },
      },
    ],
    []
  )

  const request = useMemoizedFn(async (params) => {
    const {
      current,
      pageSize,
      poetryId,
      title,
      author,
      paragraphs,
      tags,
      dynasty,
    } = params
    const poetries = await getPoetryList(
      {
        current,
        pageSize,
      },
      { poetryId, title, author, paragraphs, tags, dynasty }
    )
    return {
      total: poetries.count,
      success: true,
      data: poetries.rows.map((item: any) => ({
        ...item,
        paragraphs: JSON.parse(item.paragraphs),
        tags: item.tags ? JSON.parse(item.tags) : [],
      })),
    }
  })

  return (
    <ProTable
      size="large"
      actionRef={ref}
      rowKey="id"
      search={{
        labelWidth: 80,
        collapsed: false,
      }}
      columns={columns}
      request={request}
      scroll={{ y: 400 }}
      rowSelection={{
        selections: [],
      }}
      pagination={{ pageSize: 10 }}
      tableAlertOptionRender={({ selectedRows }) => {
        return (
          <Space size={16}>
            <a
              onClick={() => {
                setState({ previewPoetries: selectedRows })
              }}
            >
              批量打印
            </a>
            <a
              onClick={() => {
                copy(selectedRows.map((r) => r.poetryId))
              }}
            >
              批量复制
            </a>
          </Space>
        )
      }}
    />
  )
}

export default TangSong
