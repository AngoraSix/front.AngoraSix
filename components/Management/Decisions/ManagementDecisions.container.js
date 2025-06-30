import { connect } from "react-redux"
import ManagementDecisions from "./ManagementDecisions.component"

const mapStateToProps = (state) => ({
  // Add any state mappings here if needed
})

const mapDispatchToProps = (dispatch) => ({
  // Add any action dispatchers here if needed
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagementDecisions)
