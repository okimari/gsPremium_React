import React, { useState, useEffect } from 'react'; // 追加
import { Section, Title, Article, Prop, list } from "./generic";
import ReactLoading from 'react-loading';//Loading/module

// 関数
// Appが親・Booklistが子という関係になっている
// propsは親から子にデータ渡すときに使用するもの
const Booklist = props => {

    // bookDataはJsのときの空の配列を作ったよ！って感じと同じ
    // setBookDataは関数 setBookDataにデータを入れてあげるとbookDataが更新されるよって流れ
    // nullはbookDataの初期値
    const [bookData, setBookData] = useState(null);   // ここから追加
    // const [thumbnailData, setThumbnailData] = useState(null);   // ここから追加
    const result = props.getData?.(props.language);// `?`を使用することで，`getData`が存在する場合のみ関数を実行できる

    useEffect(() => {
        const result = props.getData?.(props.language).then(response => setBookData(response));
    }, [props])

    console.log(bookData)
    return (

        <div style={{
            width: '100%',
            backgroundColor: '#666',
            color: '#fff',
            padding: '0',
            margin: '0',
        }}>
            {
                bookData === null
                    ?
                    // Loadingの読み込み
                    list.map(l => (
                        <Article key={l.prop}>
                            <ReactLoading type={l.prop} color="#fff" />
                            {/* <Prop>{l.name}</Prop> */}
                        </Article>
                    ))
                    : bookData.data.items.map((x, index) =>
                        <div key={index}>
                            <p>title:{x.volumeInfo.title}</p>
                            <p>Author:{x.volumeInfo.authors}</p>
                            {/* <img src={x.volumeInfo.imageLinks.thumbnail} alt="" /> */}
                            {
                                x.volumeInfo.imageLinks === undefined
                                    ? <p>画像なし</p>
                                    : <img src={x.volumeInfo.imageLinks.thumbnail} alt="" />
                            }
                        </div>
                    )
            }

        </div>
    );
}
export default Booklist;