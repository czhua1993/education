import '../detail/index.less'
import 'events'

import { useMount, useRequest } from 'ahooks'
import React from 'react'
import ReactDOM from 'react-dom'
import { useParams, useSearchParams } from 'react-router-dom'

import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import { getChapterList } from './apis/get-chapter-list'
import simkai from './simkai.ttf'

Font.register({
  family: 'simkai',
  src: simkai,
})

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
    fontFamily: 'simkai',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
  title: {
    fontSize: 56,
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

const isSymbol = (s: string) => /[“”：；。，、？]/.test(s)

Font.registerHyphenationCallback((word: string) => {
  if (word.length === 1) {
    return [word]
  }
  return (
    Array.from(word)
      // .map((char) => (isSymbol(char) ? [char] : [char, '']))
      .map((char) => [char, ''])
      .reduce((arr, current) => {
        arr.push(...current)
        return arr
      }, [])
  )
})

export default function BookPDF() {
  const { code } = useParams<{ code: string }>()
  const [searchParams] = useSearchParams()
  const chapterList: string[] = JSON.parse(
    searchParams.get('chapterList') || '[]'
  )
  const { data } = useRequest(() => getChapterList(code!, chapterList))

  useMount(() => {
    document.getElementById('root')!.style.display = 'none'
  })

  return ReactDOM.createPortal(
    <PDFViewer style={{ width: '100%', height: 'calc(100vh - 6px)' }}>
      <Document>
        <Page size="A4" style={styles.page} wrap>
          {data?.map((chapter, index) => {
            return (
              <View key={index} wrap>
                <Text style={styles.title}>{chapter.title}</Text>
                {chapter.texts.map((text, idx) => (
                  <Text key={idx}>{text}</Text>
                ))}
              </View>
            )
          })}
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>,
    document.getElementById('print')!
  )
}
