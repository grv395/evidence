<script>
    import '@evidence-dev/tailwind/fonts.css';
    import '../app.css';
    import { EvidenceDefaultLayout } from '@evidence-dev/core-components';
    export let data;


</script>

<EvidenceDefaultLayout {data} 
hideHeader={false}
hideSidebar={false} 
fullWidth={true} 
neverShowQueries={false} 
hideBreadcrumbs ={false}
hideTOC={true}
logo=/logo.png>
    <slot slot="content" />
</EvidenceDefaultLayout>
