import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CodeBlockPlugin from '@ckeditor/ckeditor5-code-block/src/codeblock'; // Ensure this import


ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [
            EssentialsPlugin,
            BoldPlugin,
            ItalicPlugin,
            LinkPlugin,
            ListPlugin,
            BlockQuotePlugin,
            CodeBlockPlugin  // Ensure the plugin is included in the list
            // Add other necessary plugins here
        ],
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'blockQuote',
                'codeBlock'  // Ensure 'codeBlock' is in the toolbar items
                // Add other necessary toolbar items here
            ]
        },
        language: 'en'
    })
    .then(editor => {
        console.log('Editor initialized successfully:', editor);
    })
    .catch(error => {
        console.error('Error initializing CKEditor:', error);
    });
